import { Merchi } from '../merchi.js';
import { setup, mockFetch } from '../test_util.js';

setup();

test('can make Notification', () => {
  const merchi = new Merchi();
  const notification = new merchi.Notification();
  expect(notification).toBeTruthy();
});

test('can list notifications with notificationSender filter', () => {
  const merchi = new Merchi();
  const fetch = mockFetch(true, {
    'notifications': [],
    'available': 0,
    'count': 0
  }, 200);
  const options = { notificationSender: 123 };
  return merchi.Notification.list(options).then(() => {
    const query = fetch.mock.calls[0][1]['query'];
    expect(query).toContainEqual(['notification_sender', '123']);
  });
});
