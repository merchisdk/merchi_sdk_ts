import { Merchi } from '../merchi';
test('can make Component', function () {
    var merchi = new Merchi();
    var component = new merchi.Component();
    expect(component).toBeTruthy();
});
test('can convert to react component', function () {
    var merchi = new Merchi();
    var component = new merchi.Component();
    component.compiled = 'return 1;';
    component.toReact({});
});
