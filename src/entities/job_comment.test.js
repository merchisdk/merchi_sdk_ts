import { Merchi } from '../merchi';
test('can make JobComment', function () {
    var merchi = new Merchi();
    var jobComment = new merchi.JobComment();
    expect(jobComment).toBeTruthy();
});
