import { Merchi } from '../merchi';
test('can make AutomaticPaymentRelationship', function () {
    var merchi = new Merchi();
    var automaticPaymentRelationship = new merchi.AutomaticPaymentRelationship();
    expect(automaticPaymentRelationship).toBeTruthy();
});
