import { pricing } from '../index.js';

test('pricing namespace exposes calculator functions', () => {
  expect(typeof pricing.estimateQuote).toBe('function');
  expect(typeof pricing.resolveVisibleFields).toBe('function');
  expect(typeof pricing.applyDiscount).toBe('function');
  expect(typeof pricing.roundHalfEven).toBe('function');
});
