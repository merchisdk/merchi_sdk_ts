import { Merchi } from '../merchi';
test('can make ComponentTag', function () {
    var merchi = new Merchi();
    var componentTag = new merchi.ComponentTag();
    expect(componentTag).toBeTruthy();
});
