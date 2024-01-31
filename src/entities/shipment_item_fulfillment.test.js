import { Merchi } from '../merchi';
test('can make ShipmentItemFulfillment', function () {
    var merchi = new Merchi();
    var shipmentItemFulfillment = new merchi.ShipmentItemFulfillment();
    expect(shipmentItemFulfillment).toBeTruthy();
});
