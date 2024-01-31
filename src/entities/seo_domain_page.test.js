import { Merchi } from '../merchi';
test('can make SeoDomainPage', function () {
    var merchi = new Merchi();
    var seoDomainPage = new merchi.SeoDomainPage();
    expect(seoDomainPage).toBeTruthy();
});
