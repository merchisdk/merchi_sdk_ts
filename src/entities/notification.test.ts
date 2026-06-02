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

test('list forwards skipCount=true as skip_count query param', () => {
  const merchi = new Merchi();
  const fetch = mockFetch(true, {
    'notifications': [],
    // backend returns ``available: null`` when skip_count was honoured
    'available': null,
    'count': 0
  }, 200);
  const options = { skipCount: true };
  return merchi.Notification.list(options).then((response) => {
    const query = fetch.mock.calls[0][1]['query'];
    expect(query).toContainEqual(['skip_count', 'true']);
    // ``available`` must round-trip as ``null``; the typed metadata
    // is now ``number | null``, so consumers can detect the absence.
    expect(response.metadata.available).toBeNull();
  });
});

test('list omits skip_count when skipCount is not set', () => {
  const merchi = new Merchi();
  const fetch = mockFetch(true, {
    'notifications': [],
    'available': 0,
    'count': 0
  }, 200);
  return merchi.Notification.list({}).then(() => {
    const query = fetch.mock.calls[0][1]['query'];
    const skipCountEntries = query.filter(
      (entry: [string, string]) => entry[0] === 'skip_count'
    );
    expect(skipCountEntries).toEqual([]);
  });
});
