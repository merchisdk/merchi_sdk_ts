import {
  BuildPriceMatrixOptions,
  DiscountGroup,
  GroupSelection,
  PriceMatrix,
  PriceMatrixBand,
  PriceMatrixCell,
  PricingField,
  PricingRules,
  QuoteResult,
  Selections,
} from './types.js';
import { estimateQuote } from './estimate.js';

function toQuantity(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function floorMinQuantity(value: unknown): number {
  const n = toQuantity(value);
  return n >= 1 ? Math.round(n) : 1;
}

function addDiscountLimits(
  group: DiscountGroup | null | undefined,
  limits: Set<number>,
  minQuantity: number
): void {
  if (!group || !group.discounts) return;
  for (const discount of group.discounts) {
    const n = Number(discount.lowerLimit);
    if (!Number.isFinite(n)) continue;
    const qty = Math.round(n);
    if (qty > minQuantity) limits.add(qty);
  }
}

function collectFieldDiscountLimits(
  field: PricingField,
  limits: Set<number>,
  minQuantity: number
): void {
  addDiscountLimits(field.variationCostDiscountGroup, limits, minQuantity);
  addDiscountLimits(field.variationUnitCostDiscountGroup, limits, minQuantity);
  addDiscountLimits(field.heightVariationCostDiscountGroup, limits, minQuantity);
  addDiscountLimits(field.heightVariationUnitCostDiscountGroup, limits, minQuantity);
  addDiscountLimits(field.widthVariationCostDiscountGroup, limits, minQuantity);
  addDiscountLimits(field.widthVariationUnitCostDiscountGroup, limits, minQuantity);
  for (const option of field.options) {
    addDiscountLimits(option.variationCostDiscountGroup, limits, minQuantity);
    addDiscountLimits(option.variationUnitCostDiscountGroup, limits, minQuantity);
  }
}

function collectQuantityBreaks(
  rules: PricingRules,
  minQuantity: number
): number[] {
  const limits = new Set<number>([minQuantity]);
  addDiscountLimits(rules.product.discountGroup, limits, minQuantity);
  for (const item of rules.fields) {
    collectFieldDiscountLimits(item, limits, minQuantity);
  }
  for (const item of rules.groupFields) {
    collectFieldDiscountLimits(item, limits, minQuantity);
  }
  return Array.from(limits).sort((a, b) => a - b);
}

function groupHasValues(group: GroupSelection): boolean {
  const values = group.fieldValues || {};
  return Object.keys(values).some((key) => {
    const selection = values[Number(key)];
    if (!selection) return false;
    if (selection.selectedOptionIds && selection.selectedOptionIds.length) {
      return true;
    }
    const value = selection.value;
    return !(
      value === undefined ||
      value === null ||
      value === '' ||
      value === 0
    );
  });
}

function representativeGroupIndex(groups: GroupSelection[]): number {
  const idx = groups.findIndex(groupHasValues);
  return idx >= 0 ? idx : 0;
}

function selectionsAtQuantity(
  selections: Selections,
  qty: number
): Selections {
  const groups = selections.groups;
  if (groups && groups.length > 0) {
    const quantities = groups.map((group) => toQuantity(group.quantity));
    const total = quantities.reduce((sum, value) => sum + value, 0);
    if (total <= 0) {
      const idx = representativeGroupIndex(groups);
      return {
        fieldValues: selections.fieldValues || {},
        groups: groups.map((group, i) => ({
          ...group,
          quantity: i === idx ? qty : 0,
        })),
      };
    }
    const scaled: number[] = new Array(groups.length).fill(0);
    let allocated = 0;
    for (let i = 0; i < groups.length - 1; i++) {
      scaled[i] = Math.round((quantities[i] / total) * qty);
      allocated += scaled[i];
    }
    scaled[groups.length - 1] = Math.max(0, qty - allocated);
    return {
      fieldValues: selections.fieldValues || {},
      groups: groups.map((group, i) => ({
        ...group,
        quantity: scaled[i],
      })),
    };
  }
  return {
    fieldValues: selections.fieldValues || {},
    quantity: qty,
  };
}

function formatBandLabel(quantity: number, upperLimit: number | null): string {
  if (upperLimit == null) return `${quantity}+`;
  if (upperLimit === quantity) return `${quantity}`;
  return `${quantity}–${upperLimit}`;
}

function samePrice(a: PriceMatrixCell, b: PriceMatrixCell): boolean {
  return (
    Math.abs(a.costPerUnit - b.costPerUnit) < 0.001 &&
    Math.abs(a.unitPrice - b.unitPrice) < 0.001
  );
}

function withBandBounds(quantities: number[]): PriceMatrixBand[] {
  return quantities.map((quantity, i) => {
    const next = quantities[i + 1];
    const upperLimit = next == null ? null : next - 1;
    return {
      quantity,
      upperLimit,
      label: formatBandLabel(quantity, upperLimit),
    };
  });
}

/**
 * Quantity-break price table for the current selection.
 *
 * Columns are unique quantity thresholds from every discount group on the
 * product, fields, and options. Each cell is `estimateQuote` at that quantity
 * so the table matches what the form will charge. Returns null when there are
 * fewer than two distinct prices (nothing useful to show).
 */
export function buildPriceMatrix(
  rules: PricingRules,
  selections: Selections = { fieldValues: {} },
  options: BuildPriceMatrixOptions = {}
): PriceMatrix | null {
  if (rules.unsupported) return null;

  const safeRules: PricingRules = {
    ...rules,
    fields: (rules.fields || []).map((item) => ({
      ...item,
      options: item.options || [],
    })),
    groupFields: (rules.groupFields || []).map((item) => ({
      ...item,
      options: item.options || [],
    })),
  };
  const minQuantity = floorMinQuantity(options.minQuantity);
  const quantities = collectQuantityBreaks(safeRules, minQuantity);
  const quoted: PriceMatrixCell[] = [];

  for (const quantity of quantities) {
    const quote = estimateQuote(
      safeRules,
      selectionsAtQuantity(selections, quantity)
    ) as QuoteResult;
    quoted.push({
      quantity,
      costPerUnit: quote.costPerUnit,
      unitPrice: quote.cost / quantity,
      cost: quote.cost,
      taxAmount: quote.taxAmount,
      totalCost: quote.totalCost,
    });
  }

  const cells: PriceMatrixCell[] = [];
  for (const cell of quoted) {
    const prev = cells[cells.length - 1];
    if (prev && samePrice(prev, cell)) continue;
    cells.push(cell);
  }
  if (cells.length < 2) return null;

  return {
    currency: rules.currency,
    taxPercent: rules.taxPercent,
    bands: withBandBounds(cells.map((cell) => cell.quantity)),
    cells,
  };
}
