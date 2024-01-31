import { Merchi } from '../merchi';
test('can make SubscriptionPlan', function () {
    var merchi = new Merchi();
    var subscriptionPlan = new merchi.SubscriptionPlan();
    expect(subscriptionPlan).toBeTruthy();
});
