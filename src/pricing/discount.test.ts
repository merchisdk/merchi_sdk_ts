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
