import { Merchi } from '../merchi';
test('can make ShipmentMethod', function () {
    var merchi = new Merchi();
    var shipmentMethod = new merchi.ShipmentMethod();
    expect(shipmentMethod).toBeTruthy();
});
