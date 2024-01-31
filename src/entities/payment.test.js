import { setup, mockFetch } from '../test_util';
import { Merchi } from '../merchi';
setup();
test('can make Payment', function () {
    var merchi = new Merchi();
    var payment = new merchi.Payment();
    expect(payment).toBeTruthy();
});
test('payment refund', function () {
    var merchi = new Merchi();
    var payment = new merchi.Payment();
    mockFetch(true, { 'amount': 10 }, 200);
    payment.refund().then(function (payment) {
        expect(payment.amount).toEqual(10);
    });
});
