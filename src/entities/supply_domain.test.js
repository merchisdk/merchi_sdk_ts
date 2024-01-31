import { Merchi } from '../merchi';
test('can make SupplyDomain', function () {
    var merchi = new Merchi();
    var supplyDomain = new merchi.SupplyDomain();
    expect(supplyDomain).toBeTruthy();
});
