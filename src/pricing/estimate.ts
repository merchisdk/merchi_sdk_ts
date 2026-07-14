import {
  PricingRules, PricingField, PricingOption, Selections, FieldSelection,
  QuoteResult, UnsupportedResult, DiscountGroup,
} from './types.js';
import { applyDiscount } from './discount.js';
import { roundHalfEven } from './round.js';
import { resolveVisibleFields } from './visibility.js';

/** Form inputs often supply quantities as strings. Coerce before any arithmetic
 * so `reduce((a,b)=>a+b)` cannot concatenate ("100"+"1" → "01001" → 1001). */
function toQuantity(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function unitPriceAt(rules: PricingRules, qty: number): number {
  let unitPrice = applyDiscount(rules.product.unitPrice, qty, rules.product.discountGroup);
  const mop = rules.product.minimumPrice;
  if (qty > 0 && mop && unitPrice * qty < mop) {
    unitPrice = mop / qty;
  }
  return unitPrice;
}

function variationSetupCost(
  source: { variationCost: number; variationCostDiscountGroup: DiscountGroup | null },
  totalQty: number
): number {
  let cost = source.variationCost;
  if (source.variationCostDiscountGroup) {
    cost = applyDiscount(cost, totalQty, source.variationCostDiscountGroup);
  }
  return roundHalfEven(cost, 3);
}

function variationUnitCosts(
  source: { variationUnitCost: number; variationUnitCostDiscountGroup: DiscountGroup | null },
  groupQuantities: number[]
): number[] {
  const uc = source.variationUnitCost;
  const group = source.variationUnitCostDiscountGroup;
  let list: number[];
  if (group) {
    if (group.groupRestricted) {
      list = groupQuantities.map((q) => applyDiscount(uc, q, group));
    } else {
      const total = groupQuantities.reduce((a, b) => a + b, 0);
      const discounted = applyDiscount(uc, total, group);
      list = groupQuantities.map(() => discounted);
    }
  } else {
    list = groupQuantities.map(() => uc);
  }
  return list.map((c) => roundHalfEven(c, 3));
}

function isEmpty(field: PricingField, sel: FieldSelection | undefined): boolean {
  if (!sel) return true;
  if (field.isSelectable) {
    return !sel.selectedOptionIds || sel.selectedOptionIds.length === 0;
  }
  // Server `is_empty` non-selectable branch is `return not self.value`, so
  // numeric 0 is empty (but string '0' stays non-empty, since `not '0'` is False).
  return (
    sel.value === undefined ||
    sel.value === null ||
    sel.value === '' ||
    sel.value === 0
  );
}

function costFactor(
  field: PricingField,
  sel: FieldSelection | undefined,
  groupQuantities: number[]
): { setup: number; unitList: number[] } {
  const n = groupQuantities.length;
  if (isEmpty(field, sel)) {
    return { setup: 0, unitList: new Array(n).fill(0) };
  }
  const totalQty = groupQuantities.reduce((a, b) => a + b, 0);
  if (field.isSelectable) {
    let setup = 0;
    const unitList = new Array(n).fill(0);
    const optById = new Map<number, PricingOption>();
    for (const o of field.options) {
      optById.set(o.id, o);
      if (o.originalId != null) optById.set(o.originalId, o);
    }
    for (const optId of sel!.selectedOptionIds!) {
      const opt = optById.get(optId);
      if (!opt) continue;
      setup += variationSetupCost(opt, totalQty);
      const ucs = variationUnitCosts(opt, groupQuantities);
      for (let i = 0; i < n; i++) unitList[i] += ucs[i];
    }
    return { setup, unitList };
  }
  return {
    setup: variationSetupCost(field, totalQty),
    unitList: variationUnitCosts(field, groupQuantities),
  };
}

export function estimateQuote(
  rules: PricingRules,
  selections: Selections
): QuoteResult | UnsupportedResult {
  if (rules.unsupported) {
    return { unsupported: rules.unsupported };
  }

  const groupCosts: number[] = [];
  let cost = 0;
  let costPerUnit: number;
  let groupQuantities: number[];

  // Mirror the server's `update_group_variations_cost_and_job_cost`
  // (jobs.py ~3321): the group-vs-single branch keys off whether the *job*
  // actually has variation groups (`if self.variations_groups:`), NOT the
  // product's `hasGroups` capability. A group-capable product with no groups
  // submitted is priced as a single non-group job (the server's `else` branch
  // sets `group_quantities = [self.quantity or 0]`).
  const groups = selections.groups || [];
  if (groups.length > 0) {
    groupQuantities = groups.map((g) => toQuantity(g.quantity));
    const totalQty = groupQuantities.reduce((a, b) => a + b, 0);
    const restricted = Boolean(rules.product.discountGroup?.groupRestricted);
    const baseUnitPrice = unitPriceAt(rules, totalQty);
    const perGroupCpu: number[] = [];

    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const gQty = groupQuantities[gi];
      const cpu = restricted ? unitPriceAt(rules, gQty) : baseUnitPrice;
      perGroupCpu.push(cpu);
      // Server `VariationsGroups.update_cost` (variations_groups.py ~238):
      // `if not self.quantity: self.group_cost = 0; return` — a zero-qty group
      // contributes exactly 0 and adds NO field/variation costs.
      if (!gQty) {
        groupCosts.push(0);
        continue;
      }
      // A group's field visibility is scoped to that group's own selections
      // plus the job-level (independent) selections — NOT other groups'
      // (server `VariationsGroups.selected_options` = group.variations +
      // job.variations, variations_groups.py ~252).
      const groupVisible = resolveVisibleFields(rules, {
        fieldValues: selections.fieldValues,
        groups: [group],
      });
      let groupVariationCost = 0;
      for (const field of rules.groupFields) {
        if (!groupVisible.has(field.id)) continue;
        const { setup, unitList } = costFactor(field, group.fieldValues[field.id], [gQty]);
        groupVariationCost += setup + unitList[0] * gQty;
      }
      const groupCost = gQty * cpu + groupVariationCost;
      groupCosts.push(groupCost);
      cost += groupCost;
    }

    costPerUnit = totalQty > 0
      ? perGroupCpu.reduce((acc, cpu, i) => acc + cpu * groupQuantities[i], 0) / totalQty
      : baseUnitPrice;

    // Independent (job-level) field visibility is scoped to independent
    // selections only (server `Jobs.selected_options` = job.variations,
    // jobs.py ~1392), so other groups' selections never reveal them.
    const independentVisible = resolveVisibleFields(rules, {
      quantity: selections.quantity,
      fieldValues: selections.fieldValues,
    });
    for (const field of rules.fields) {
      if (!independentVisible.has(field.id)) continue;
      const { setup, unitList } = costFactor(field, selections.fieldValues[field.id], groupQuantities);
      const unitTotal = unitList.reduce((acc, uc, i) => acc + uc * groupQuantities[i], 0);
      cost += setup + unitTotal;
    }
  } else {
    const qty = toQuantity(selections.quantity);
    groupQuantities = [qty];
    costPerUnit = unitPriceAt(rules, qty);
    cost = costPerUnit * qty;
    // No groups: single-job scope (resolveVisibleFields with no groups uses
    // only the top-level selections and considers only independent fields).
    const visible = resolveVisibleFields(rules, selections);
    for (const field of rules.fields) {
      if (!visible.has(field.id)) continue;
      const { setup, unitList } = costFactor(field, selections.fieldValues[field.id], groupQuantities);
      cost += setup + unitList[0] * qty;
    }
  }

  // Server `Jobs.update_cost` (jobs.py ~3452-3454) accumulates `self.cost` at
  // full precision and computes `self.tax_amount = tax(self.cost, ...)` on the
  // UNROUNDED cost (money_protocol.py `tax` does NOT round). `cost` and
  // `taxAmount` are then rounded INDEPENDENTLY at serialization to 2dp
  // (jobs.py ~2169-2171). So tax must be derived from the unrounded cost.
  const unroundedCost = cost;
  const roundedCost = roundHalfEven(unroundedCost, 2);
  const unroundedTax = (unroundedCost * rules.taxPercent) / 100;
  const taxAmount = roundHalfEven(unroundedTax, 2);
  return {
    costPerUnit: roundHalfEven(costPerUnit, 3),
    cost: roundedCost,
    taxAmount,
    // `totalCost` mirrors `Jobs.all_total_cost` = `self.cost + self.tax_amount`
    // (jobs.py ~1724), serialized UNROUNDED at jobs.py ~1899. We round to 3dp to
    // strip float noise while matching the server's effective Numeric scale.
    totalCost: roundHalfEven(unroundedCost + unroundedTax, 3),
    // `result["groupCost"] = self.group_cost` is serialized UNROUNDED
    // (variations_groups.py ~154); round to 3dp to match the Numeric scale.
    groupCosts: groupCosts.map((c) => roundHalfEven(c, 3)),
    currency: rules.currency,
  };
}
