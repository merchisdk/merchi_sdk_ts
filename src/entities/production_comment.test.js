import { Merchi } from '../merchi';
test('can make ProductionComment', function () {
    var merchi = new Merchi();
    var productionComment = new merchi.ProductionComment();
    expect(productionComment).toBeTruthy();
});
