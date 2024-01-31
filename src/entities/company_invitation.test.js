import { Merchi } from '../merchi';
test('can make CompanyInvitation', function () {
    var merchi = new Merchi();
    var companyInvitation = new merchi.CompanyInvitation();
    expect(companyInvitation).toBeTruthy();
});
