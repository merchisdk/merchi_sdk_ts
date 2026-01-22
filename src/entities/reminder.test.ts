import { Merchi } from '../merchi.js';

test('can make Reminder', () => {
  const merchi = new Merchi();
  const reminder = new merchi.Reminder();
  expect(reminder).toBeTruthy();
});

test('reminder created date serialised to unix timestamp', () => {
  const merchi = new Merchi();
  const reminder = new merchi.Reminder();
  reminder.created = new Date('Feb 28 2013 19:00:00 GMT-0500');
  const correct = [['created', '1362096000']];
  const backData = Array.from((reminder.toFormData() as any).entries());
  expect(backData).toEqual(correct);
});
