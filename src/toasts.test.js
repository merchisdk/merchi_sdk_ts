import { setup, mockFetch } from './test_util';
import { toastNotifications } from './toasts';
import { Merchi } from './merchi';
import { NotificationSection } from './constants/notification_sections';
import { NotificationType } from './constants/notification_types';
setup();
test('fetch toast of jobs', function () {
    var _a, _b;
    var merchi = new Merchi();
    var fetch = mockFetch(true, { 'notifications': [{ id: 1, message: 'test' }] }, 200);
    var entities = [{ id: 1, type: 'job' }];
    var sections = [NotificationSection.JOB_NOTIFICATIONS];
    var notificationTypes = (_a = {}, _a[NotificationType.JOB_PAID] = true, _a);
    var options = { entities: entities, sections: sections, notificationTypes: notificationTypes };
    var invocation = toastNotifications(merchi, options);
    var expectUrl = "".concat(global.BACKEND_URI, "v6/notifications-check-update/");
    expect(fetch.mock.calls[0][0]).toEqual(expectUrl);
    expect(fetch.mock.calls[0][1].method).toEqual('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body.get('entities'))).toEqual([{ id: 1, type: 'job' }]);
    expect(fetch.mock.calls[0][1].body.get('sections')).toEqual("[".concat(NotificationSection.JOB_NOTIFICATIONS, "]"));
    expect(JSON.parse(fetch.mock.calls[0][1].body.get('notificationTypes'))).toEqual((_b = {}, _b[NotificationType.JOB_PAID] = true, _b));
    invocation.then(function (notifications) {
        expect(notifications.length).toBe(1);
        expect(notifications[0].id).toBe(1);
        expect(notifications[0].message).toBe('test');
    });
    return invocation;
});
