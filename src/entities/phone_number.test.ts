import { Merchi } from '../merchi.js';

test('can make PhoneNumber', () => {
  const merchi = new Merchi();
  const phoneNumber = new merchi.PhoneNumber();
  expect(phoneNumber).toBeTruthy();
});
