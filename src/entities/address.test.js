import { Merchi } from '../merchi';
test('can make Address', function () {
    var merchi = new Merchi();
    var address = new merchi.Address();
    expect(address).toBeTruthy();
});
