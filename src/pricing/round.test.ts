import { roundHalfEven } from './round.js';

test('rounds half to even like Python round()', () => {
  expect(roundHalfEven(0.5, 0)).toBe(0);
  expect(roundHalfEven(1.5, 0)).toBe(2);
  expect(roundHalfEven(2.5, 0)).toBe(2);
  expect(roundHalfEven(1.005, 2)).toBe(1.0);
  expect(roundHalfEven(-2.5, 0)).toBe(-2);
  expect(roundHalfEven(12.3456, 3)).toBe(12.346);
});

test('returns non-finite inputs unchanged', () => {
  expect(roundHalfEven(Infinity, 2)).toBe(Infinity);
  expect(Number.isNaN(roundHalfEven(NaN, 2))).toBe(true);
});

test('non-halfway values use normal rounding', () => {
  expect(roundHalfEven(2.34, 1)).toBe(2.3);
  expect(roundHalfEven(2.36, 1)).toBe(2.4);
});
