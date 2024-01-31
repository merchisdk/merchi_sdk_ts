import { Merchi } from '../merchi';
test('can make ShipmentItem', function () {
    var merchi = new Merchi();
    var shipmentItem = new merchi.ShipmentItem();
    expect(shipmentItem).toBeTruthy();
});
