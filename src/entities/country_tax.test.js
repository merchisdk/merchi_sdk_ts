import { Merchi } from '../merchi';
test('can make CountryTax', function () {
    var merchi = new Merchi();
    var countryTax = new merchi.CountryTax();
    expect(countryTax).toBeTruthy();
});
test('getNoTax', function () {
    var merchi = new Merchi();
    var noTax = merchi.CountryTax.getNoTax();
    expect(noTax.id).toBe(3);
});
