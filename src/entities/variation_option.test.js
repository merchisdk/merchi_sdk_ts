import { Merchi } from '../merchi';
test('can make Variation', function () {
    var merchi = new Merchi();
    var option = new merchi.VariationOption();
    expect(option).toBeTruthy();
});
