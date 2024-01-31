import { Merchi } from '../merchi';
test('can make Company', function () {
    var merchi = new Merchi();
    var company = new merchi.Company();
    expect(company).toBeTruthy();
});
