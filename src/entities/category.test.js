import { Merchi } from '../merchi';
test('can make category', function () {
    var merchi = new Merchi();
    var category = new merchi.Category();
    expect(category).toBeTruthy();
});
test('can get and set id', function () {
    var merchi = new Merchi();
    var category = new merchi.Category();
    category.id = 2;
    expect(category.id).toBe(2);
});
test('can get and set name', function () {
    var merchi = new Merchi();
    var category = new merchi.Category();
    category.name = 'example';
    expect(category.name).toBe('example');
});
test('can get and set product', function () {
    var merchi = new Merchi();
    var c1 = new merchi.Category();
    var c2 = new merchi.Category();
    var p1 = new merchi.Product();
    var p2 = new merchi.Product();
    var cs = [c1, c2];
    var ps = [p1, p2];
    c1.products = ps;
    expect(c1.products).toBe(ps);
    expect(c2.products).toBe(undefined);
    expect(p1.categories).toBe(undefined);
    p1.categories = cs;
    expect(p1.categories).toBe(cs);
    p1.categories = undefined;
    expect(p1.categories).toBe(undefined);
});
test('independence of entities', function () {
    var merchi = new Merchi();
    var c1 = new merchi.Category();
    var c2 = new merchi.Category();
    var p = new merchi.Product();
    var name = 'vMjssEhwpHtMT';
    var products = [p];
    c1.name = name;
    c1.products = products;
    expect(c1.name).toBe(name);
    expect(c1.products).toBe(products);
    expect(c1.isDirty).toBe(true);
    // c2 is a different object, and therefore totally unnaffected
    expect(c2.name).toBe(undefined);
    expect(c2.products).toBe(undefined);
    expect(c2.isDirty).toBe(false);
});
