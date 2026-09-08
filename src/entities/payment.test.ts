import { setup, mockFetch } from '../test_util.js';
import { Merchi } from '../merchi.js';

setup();

test('can make Payment', () => {
  const merchi = new Merchi();
  const payment = new merchi.Payment();
  expect(payment).toBeTruthy();
});

test('payment refund', () => {
  const merchi = new Merchi();
  const payment = new merchi.Payment();
  mockFetch(true, { 'amount': 10 }, 200);
  payment.refund().then(payment => {
    expect(payment.amount).toEqual(10);
  });
});


test('wallet method and partial refund survive API serialization', () => {
  const payment = new (new Merchi()).Payment();
  payment.fromJson({ id: 8, amount: 20, paymentType: 1, paymentProvider: 'stripe',
    paymentMethod: 'wechat_pay', refundedAmount: 5, refundStatus: 'pending' });
  expect(payment.toJson()).toMatchObject({ paymentMethod: 'wechat_pay', refundedAmount: 5, refundStatus: 'pending' });
});
