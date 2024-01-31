import { Merchi } from '../merchi';
test('can make MenuItem', function () {
    var merchi = new Merchi();
    var menuItem = new merchi.MenuItem();
    expect(menuItem).toBeTruthy();
});
