import { applyDiscount } from './discount.js';
import { DiscountGroup } from './types.js';

const group: DiscountGroup = {
  groupRestricted: false,
  discounts: [
    { lowerLimit: 100, amount: 5 },
    { lowerLimit: 500, amount: 12 },
  ],
};

test('no group returns price unchanged (rounded)', () => {
  expect(applyDiscount(10, 50, null)).toBe(10);
});

test('below lowest tier: no discount', () => {
  expect(applyDiscount(10, 50, group)).toBe(10);
});

test('picks highest tier whose lowerLimit <= qty', () => {
  expect(applyDiscount(10, 100, group)).toBe(9.5);
  expect(applyDiscount(10, 499, group)).toBe(9.5);
  expect(applyDiscount(10, 500, group)).toBe(8.8);
});

test('empty discounts: no discount', () => {
  expect(applyDiscount(10, 1000, { groupRestricted: false, discounts: [] })).toBe(10);
});

test('explicit zero-amount tier is applied (distinct from below-tier)', () => {
  expect(
    applyDiscount(10, 100, {
      groupRestricted: false,
      discounts: [{ lowerLimit: 100, amount: 0 }],
    })
  ).toBe(10);
});

test('applied discount is rounded to 3dp', () => {
  // 10 * (1 - 33.333/100) = 6.6667 -> 3dp -> 6.667
  expect(
    applyDiscount(10, 100, {
      groupRestricted: false,
      discounts: [{ lowerLimit: 100, amount: 33.333 }],
    })
  ).toBe(6.667);
});
