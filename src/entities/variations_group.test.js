import { Merchi } from '../merchi';
test('can make VariationsGroup', function () {
    var merchi = new Merchi();
    var variationsGroup = new merchi.VariationsGroup();
    expect(variationsGroup).toBeTruthy();
});
