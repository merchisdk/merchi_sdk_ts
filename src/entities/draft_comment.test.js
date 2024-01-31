import { Merchi } from '../merchi';
test('can make DraftComment', function () {
    var merchi = new Merchi();
    var draftComment = new merchi.DraftComment();
    expect(draftComment).toBeTruthy();
});
