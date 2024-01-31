import { Merchi } from '../merchi';
test('can make SystemRole', function () {
    var merchi = new Merchi();
    var systemRole = new merchi.SystemRole();
    expect(systemRole).toBeTruthy();
});
