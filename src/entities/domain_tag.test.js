import { Merchi } from '../merchi';
test('can make DomainTag', function () {
    var merchi = new Merchi();
    var domainTag = new merchi.DomainTag();
    expect(domainTag).toBeTruthy();
});
