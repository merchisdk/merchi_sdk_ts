import { Merchi } from '../merchi';
test('can make Notification', function () {
    var merchi = new Merchi();
    var notification = new merchi.Notification();
    expect(notification).toBeTruthy();
});
