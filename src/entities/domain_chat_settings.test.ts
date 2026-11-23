import { Merchi } from '../merchi.js';

test('can make DomainChatSettings', () => {
  const merchi = new Merchi();
  const settings = new merchi.DomainChatSettings();
  expect(settings).toBeTruthy();
});

test('can set assignedUsers', () => {
  const merchi = new Merchi();
  const settings = new merchi.DomainChatSettings();
  const user = new merchi.User();
  user.id = 11;
  settings.assignedUsers = [user];
  expect(settings.assignedUsers?.map((u) => u.id)).toEqual([11]);
});
