import { Merchi } from '../merchi.js';

test('can make Variation', () => {
  const merchi = new Merchi();
  const variation = new merchi.Variation();
  expect(variation).toBeTruthy();
});
