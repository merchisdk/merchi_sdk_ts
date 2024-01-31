import { Merchi } from '../merchi';
test('can make Menu', function () {
    var merchi = new Merchi();
    var menu = new merchi.Menu();
    expect(menu).toBeTruthy();
});
