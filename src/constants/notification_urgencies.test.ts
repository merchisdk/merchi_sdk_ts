import { NotificationUrgency } from './notification_urgencies.js';

test('urgent notification urgency exists', () => {
  expect(NotificationUrgency.URGENT).toBe(3);
});
