import { Merchi } from '../merchi';
test('can make EmailCounter', function () {
    var merchi = new Merchi();
    var emailCounter = new merchi.EmailCounter();
    expect(emailCounter).toBeTruthy();
});
