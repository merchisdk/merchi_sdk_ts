import { DiscountGroup } from './types.js';
import { roundHalfEven } from './round.js';

function resolveDiscountAmount(
  qty: number,
  group: DiscountGroup | null
): number {
  if (!group || group.discounts.length === 0) return 0;
  const applicable = group.discounts
    .filter((d) => d.lowerLimit <= qty)
    .sort((a, b) => b.lowerLimit - a.lowerLimit);
  return applicable.length ? applicable[0].amount : 0;
}

/** Configured discount percent for `qty` (same tier resolution as `applyDiscount`). */
export function getDiscountPercent(
  qty: number,
  group: DiscountGroup | null
): number {
  return resolveDiscountAmount(qty, group);
}

export function applyDiscount(
  price: number,
  qty: number,
  group: DiscountGroup | null
): number {
  if (!group || group.discounts.length === 0) {
    return roundHalfEven(price, 3);
  }
  const amount = resolveDiscountAmount(qty, group);
  return roundHalfEven(price * (1 - amount / 100), 3);
}
