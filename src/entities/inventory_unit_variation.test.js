import { Merchi } from '../merchi';
test('can make InventoryUnitVariation', function () {
    var merchi = new Merchi();
    var inventoryUnitVariation = new merchi.InventoryUnitVariation();
    expect(inventoryUnitVariation).toBeTruthy();
});
