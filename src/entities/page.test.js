import { Merchi } from '../merchi';
test('can make Page', function () {
    var merchi = new Merchi();
    var page = new merchi.Page();
    expect(page).toBeTruthy();
});
