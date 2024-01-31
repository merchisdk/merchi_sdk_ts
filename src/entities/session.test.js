import { Merchi } from '../merchi';
test('can make Session', function () {
    var merchi = new Merchi();
    var session = new merchi.Session();
    expect(session).toBeTruthy();
});
