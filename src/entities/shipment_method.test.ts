import { Merchi } from '../merchi.js';

test('can make ShipmentMethod', () => {
  const merchi = new Merchi();
  const shipmentMethod = new merchi.ShipmentMethod();
  expect(shipmentMethod).toBeTruthy();
});
