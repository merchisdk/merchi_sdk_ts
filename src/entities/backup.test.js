import { Merchi } from '../merchi';
test('can make Backup', function () {
    var merchi = new Merchi();
    var backup = new merchi.Backup();
    expect(backup).toBeTruthy();
});
