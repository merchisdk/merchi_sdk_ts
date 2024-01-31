import { Merchi } from '../merchi';
test('can make PaymentDevice', function () {
    var merchi = new Merchi();
    var paymentDevice = new merchi.PaymentDevice();
    expect(paymentDevice).toBeTruthy();
});
