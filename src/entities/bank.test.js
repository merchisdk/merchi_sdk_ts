import { Merchi } from '../merchi';
test('can make Bank', function () {
    var merchi = new Merchi();
    var bank = new merchi.Bank();
    expect(bank).toBeTruthy();
});
