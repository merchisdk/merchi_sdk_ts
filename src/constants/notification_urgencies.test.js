import { NotificationUrgency } from './notification_urgencies';
test('urgent notification urgency exists', function () {
    expect(NotificationUrgency.URGENT).toBe(3);
});
