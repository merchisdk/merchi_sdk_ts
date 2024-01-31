import { Merchi } from '../merchi';
test('can make Shipment', function () {
    var merchi = new Merchi();
    var shipment = new merchi.Shipment();
    expect(shipment).toBeTruthy();
});
test('can calculation undefined handling', function () {
    var merchi = new Merchi();
    var shipment = new merchi.Shipment();
    expect(function () { return shipment.calculateSubTotal(); }).toThrow();
    expect(shipment.calculateSubTotal({ strictEmbed: false })).toEqual('0.000');
    expect(function () { return shipment.calculateTaxAmount(); }).toThrow();
    expect(shipment.calculateTaxAmount({ strictEmbed: false })).toEqual('0.000');
});
test('can calculation tax with tax type undefined', function () {
    var merchi = new Merchi();
    var shipment = new merchi.Shipment();
    shipment.cost = 0;
    expect(shipment.calculateTaxAmount()).toEqual('0.000');
});
