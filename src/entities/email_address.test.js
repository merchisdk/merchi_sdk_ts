import { Merchi } from '../merchi';
test('can make EmailAddress', function () {
    var merchi = new Merchi();
    var emailAddress = new merchi.EmailAddress();
    expect(emailAddress).toBeTruthy();
});
