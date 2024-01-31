import { Merchi } from '../merchi';
test('can make Discount', function () {
    var merchi = new Merchi();
    var discount = new merchi.Discount();
    expect(discount).toBeTruthy();
});
test('discountedUnitCost', function () {
    var merchi = new Merchi();
    var discount = new merchi.Discount();
    var product = new merchi.Product();
    expect(function () { return discount.discountedUnitCost(product.unitPrice); }).toThrow();
    product.unitPrice = 200.8;
    expect(function () { return discount.discountedUnitCost(product.unitPrice); }).toThrow();
    discount.amount = 94.6;
    expect(discount.discountedUnitCost(product.unitPrice)).toEqual('10.843');
});
