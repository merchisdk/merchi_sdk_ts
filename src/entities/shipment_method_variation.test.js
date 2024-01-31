import { Merchi } from '../merchi';
test('can make ShipmentMethodVariation', function () {
    var merchi = new Merchi();
    var shipmentMethodVariation = new merchi.ShipmentMethodVariation();
    expect(shipmentMethodVariation).toBeTruthy();
});
