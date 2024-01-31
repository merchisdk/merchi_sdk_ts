import { ShipmentService } from './shipment_services';
test('dhl exists', function () {
    expect(ShipmentService.SENDLE).toBe(1);
});
