import { Merchi } from '../merchi';
test('can make ComponentVersion', function () {
    var merchi = new Merchi();
    var countryTax = new merchi.ComponentVersion();
    expect(countryTax).toBeTruthy();
});
