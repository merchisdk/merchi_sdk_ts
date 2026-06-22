import { DiscountGroup } from './types.js';
import { roundHalfEven } from './round.js';

export function applyDiscount(
  price: number,
  qty: number,
  group: DiscountGroup | null
): number {
  if (!group || group.discounts.length === 0) {
    return roundHalfEven(price, 3);
  }
  const applicable = group.discounts
    .filter((d) => d.lowerLimit <= qty)
    .sort((a, b) => b.lowerLimit - a.lowerLimit);
  const amount = applicable.length ? applicable[0].amount : 0;
  return roundHalfEven(price * (1 - amount / 100), 3);
}
