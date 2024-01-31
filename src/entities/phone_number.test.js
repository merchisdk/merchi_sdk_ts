import { Merchi } from '../merchi';
test('can make PhoneNumber', function () {
    var merchi = new Merchi();
    var phoneNumber = new merchi.PhoneNumber();
    expect(phoneNumber).toBeTruthy();
});
