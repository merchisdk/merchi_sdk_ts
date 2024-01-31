import { Merchi } from '../merchi';
test('can make Inventory', function () {
    var merchi = new Merchi();
    var inventory = new merchi.Inventory();
    expect(inventory).toBeTruthy();
});
test('isVariationFieldOptionSelected function', function () {
    var merchi = new Merchi();
    var inventory = new merchi.Inventory();
    var option1 = new merchi.VariationFieldsOption();
    option1.id = 1;
    var option2 = new merchi.VariationFieldsOption();
    option2.id = 2;
    expect(function () { return inventory.isVariationFieldOptionSelected(option1); }).toThrow();
    var inventoryUnitVariation = new merchi.InventoryUnitVariation();
    inventory.inventoryUnitVariations = [inventoryUnitVariation];
    expect(function () { return inventory.isVariationFieldOptionSelected(option1); }).toThrow();
    inventoryUnitVariation.variationFieldsOption = option2;
    expect(inventory.isVariationFieldOptionSelected(option1)).toBe(false);
    inventoryUnitVariation.variationFieldsOption = option1;
    expect(inventory.isVariationFieldOptionSelected(option1)).toBe(true);
});
