import { Merchi } from '../merchi';
test('can make exchange rate', function () {
    var merchi = new Merchi();
    var exchangeRate = new merchi.ExchangeRate();
    expect(exchangeRate).toBeTruthy();
});
