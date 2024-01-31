import { PaymentType } from './payment_types';
test('urgent notification urgency exists', function () {
    expect(PaymentType.ONLINE_PAYMENT).toBe(1);
});
