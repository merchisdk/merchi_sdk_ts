import { Merchi } from '../merchi';
test('can make DomainInvitation', function () {
    var merchi = new Merchi();
    var domainInvitation = new merchi.DomainInvitation();
    expect(domainInvitation).toBeTruthy();
});
