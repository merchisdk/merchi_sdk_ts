import { Merchi } from '../merchi';
test('can make EnrolledDomain', function () {
    var merchi = new Merchi();
    var enrolledDomain = new merchi.EnrolledDomain();
    expect(enrolledDomain).toBeTruthy();
});
