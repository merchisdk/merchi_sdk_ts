import { Merchi } from '../merchi';
test('can make UserCompany', function () {
    var merchi = new Merchi();
    var userCompany = new merchi.UserCompany();
    expect(userCompany).toBeTruthy();
});
