import { Merchi } from '../merchi.js';

test('can make ShipmentMethodVariation', () => {
  const merchi = new Merchi();
  const shipmentMethodVariation = new merchi.ShipmentMethodVariation();
  expect(shipmentMethodVariation).toBeTruthy();
});
