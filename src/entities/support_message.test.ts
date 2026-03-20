import { Merchi } from '../merchi.js';

test('can make SupportMessage', () => {
  const merchi = new Merchi();
  const supportMessage = new merchi.SupportMessage();
  expect(supportMessage).toBeTruthy();
});
