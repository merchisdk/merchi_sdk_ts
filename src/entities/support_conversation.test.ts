import { Merchi } from '../merchi.js';

test('can make SupportConversation', () => {
  const merchi = new Merchi();
  const supportConversation = new merchi.SupportConversation();
  expect(supportConversation).toBeTruthy();
});
