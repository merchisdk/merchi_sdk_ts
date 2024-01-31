import { Merchi } from '../merchi';
test('can make DraftTemplate', function () {
    var merchi = new Merchi();
    var draftTemplate = new merchi.DraftTemplate();
    expect(draftTemplate).toBeTruthy();
});
