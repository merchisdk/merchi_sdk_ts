import {
  PricingRules, PricingField, PricingOption, Selections, FieldSelection,
  QuoteResult, UnsupportedResult, DiscountGroup,
} from './types.js';
import { applyDiscount } from './discount.js';
import { roundHalfEven } from './round.js';
import { resolveVisibleFields } from './visibility.js';

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
  return sel.value === undefined || sel.value === null || sel.value === '';
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

  const visible = resolveVisibleFields(rules, selections);
  const groupCosts: number[] = [];
  let cost = 0;
  let costPerUnit: number;
  let groupQuantities: number[];

  if (rules.hasGroups) {
    const groups = selections.groups || [];
    groupQuantities = groups.map((g) => g.quantity || 0);
    const totalQty = groupQuantities.reduce((a, b) => a + b, 0);
    const restricted = Boolean(rules.product.discountGroup?.groupRestricted);
    const baseUnitPrice = unitPriceAt(rules, totalQty);
    const perGroupCpu: number[] = [];

    for (const group of groups) {
      const gQty = group.quantity || 0;
      const cpu = restricted ? unitPriceAt(rules, gQty) : baseUnitPrice;
      perGroupCpu.push(cpu);
      let groupVariationCost = 0;
      for (const field of rules.groupFields) {
        if (!visible.has(field.id)) continue;
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

    for (const field of rules.fields) {
      if (!visible.has(field.id)) continue;
      const { setup, unitList } = costFactor(field, selections.fieldValues[field.id], groupQuantities);
      const unitTotal = unitList.reduce((acc, uc, i) => acc + uc * groupQuantities[i], 0);
      cost += setup + unitTotal;
    }
  } else {
    const qty = selections.quantity || 0;
    groupQuantities = [qty];
    costPerUnit = unitPriceAt(rules, qty);
    cost = costPerUnit * qty;
    for (const field of rules.fields) {
      if (!visible.has(field.id)) continue;
      const { setup, unitList } = costFactor(field, selections.fieldValues[field.id], groupQuantities);
      cost += setup + unitList[0] * qty;
    }
  }

  cost = roundHalfEven(cost, 2);
  const taxAmount = roundHalfEven((cost * rules.taxPercent) / 100, 2);
  return {
    costPerUnit: roundHalfEven(costPerUnit, 3),
    cost,
    taxAmount,
    totalCost: roundHalfEven(cost + taxAmount, 2),
    groupCosts: groupCosts.map((c) => roundHalfEven(c, 2)),
    currency: rules.currency,
  };
}
