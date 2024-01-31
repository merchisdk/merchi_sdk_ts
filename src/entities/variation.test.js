import { Merchi } from '../merchi';
test('can make Variation', function () {
    var merchi = new Merchi();
    var variation = new merchi.Variation();
    expect(variation).toBeTruthy();
});
