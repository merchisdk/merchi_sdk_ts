import { Merchi } from '../merchi';
test('can make Discount Group', function () {
    var merchi = new Merchi();
    var discountGroup = new merchi.DiscountGroup();
    expect(discountGroup).toBeTruthy();
});
