import { Merchi } from '../merchi';
test('can make VariationField', function () {
    var merchi = new Merchi();
    var variationField = new merchi.VariationField();
    expect(variationField).toBeTruthy();
});
test('isSelectable', function () {
    var merchi = new Merchi();
    var vf = new merchi.VariationField();
    expect(vf.isSelectable).toThrow();
    vf.fieldType = 1;
    expect(vf.isSelectable()).toBe(false);
    vf.fieldType = 11;
    expect(vf.isSelectable()).toBe(true);
});
test('buildEmptyVariation cost', function () {
    var merchi = new Merchi();
    var vf = new merchi.VariationField();
    expect(vf.buildEmptyVariation).toThrow();
    vf.defaultValue = 'a';
    vf.fieldType = 11;
    expect(vf.buildEmptyVariation).toThrow();
    vf.variationCost = 2;
    expect(vf.buildEmptyVariation).toThrow();
    var o1 = new merchi.VariationFieldsOption();
    var o2 = new merchi.VariationFieldsOption();
    o1.default = true;
    vf.options = [o1, o2];
    expect(vf.buildEmptyVariation).toThrow();
    o1.variationCost = 3;
    expect(vf.buildEmptyVariation().onceOffCost).toEqual(3);
    vf.fieldType = 1;
    expect(vf.buildEmptyVariation().onceOffCost).toEqual(2);
});
test('buildEmptyVariation seller editable options', function () {
    var merchi = new Merchi();
    var vf = new merchi.VariationField();
    expect(vf.buildEmptyVariation).toThrow();
    vf.defaultValue = 'a';
    vf.fieldType = 11;
    vf.sellerProductEditable = true;
    vf.variationCost = 2;
    expect(vf.buildEmptyVariation).toThrow();
    var o1 = new merchi.VariationFieldsOption();
    var o2 = new merchi.VariationFieldsOption();
    o1.include = true;
    o1.id = 1;
    o1.variationCost = 1;
    o2.default = true;
    o2.id = 2;
    o2.variationCost = 1;
    vf.options = [o1, o2];
    expect(vf.buildEmptyVariation().value).toEqual('1');
});
test('buildEmptyVariation selectable options', function () {
    var merchi = new Merchi();
    var vf = new merchi.VariationField();
    var o1 = new merchi.VariationFieldsOption();
    var o2 = new merchi.VariationFieldsOption();
    o1.value = 'test 1';
    o2.value = 'test 2';
    vf.options = [o1, o2];
    vf.variationCost = 2;
    vf.defaultValue = 'a';
    vf.fieldType = 11;
    var v = vf.buildEmptyVariation();
    expect(v.selectableOptions[0].value).toEqual('test 1');
    expect(v.selectableOptions[1].value).toEqual('test 2');
});
