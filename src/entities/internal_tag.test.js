import { Merchi } from '../merchi';
test('can make InternalTag', function () {
    var merchi = new Merchi();
    var internalTag = new merchi.InternalTag();
    expect(internalTag).toBeTruthy();
});
