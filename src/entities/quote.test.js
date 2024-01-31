import { Merchi } from '../merchi';
test('can make Quote', function () {
    var merchi = new Merchi();
    var quote = new merchi.Quote();
    expect(quote).toBeTruthy();
});
test('calculation', function () {
    var merchi = new Merchi();
    var quote = new merchi.Quote();
    var gst = new merchi.CountryTax();
    gst.taxName = 'GST';
    gst.taxPercent = 10;
    var noTax = merchi.CountryTax.getNoTax();
    // quote items did not filled before calculation seems like a embed issue
    expect(quote.quoteTotal).toThrow();
    expect(quote.calculateSubTotal).toThrow();
    expect(quote.calculateTaxAmount).toThrow();
    quote.quoteItems = [new merchi.QuoteItem(), new merchi.QuoteItem()];
    quote.quoteItems[0].unitPrice = 400;
    quote.quoteItems[0].quantity = 2;
    quote.quoteItems[0].taxType = gst;
    quote.quoteItems[1].unitPrice = 25;
    quote.quoteItems[1].quantity = 2;
    quote.quoteItems[1].taxType = noTax;
    // shipments did not filled before calculation seems like a embed issue
    expect(quote.quoteTotal).toThrow();
    expect(quote.calculateSubTotal).toThrow();
    expect(quote.calculateTaxAmount).toThrow();
    quote.shipments = [new merchi.Shipment()];
    quote.shipments[0].cost = 100;
    quote.shipments[0].taxType = gst;
    // 800 * 1.1 + 25 * 2 + 100 * 1.1 = 1040
    expect(quote.quoteTotal()).toBe('1040.000');
    expect(quote.quoteTotal({ 'strictEmbed': false })).toBe('1040.000');
    expect(quote.calculateTotal()).toBe('1040.000');
    expect(quote.calculateTotal({ 'strictEmbed': false })).toBe('1040.000');
    // 800 + 25 * 2 + 100
    expect(quote.calculateSubTotal()).toBe('950.000');
    expect(quote.calculateSubTotal({ 'strictEmbed': false })).toBe('950.000');
    // 800 * 0.1 + 100 * 0.1
    expect(quote.calculateTaxAmount()).toBe('90.000');
    expect(quote.calculateTaxAmount({ 'strictEmbed': false })).toBe('90.000');
});
test('findQuoteItemIndex', function () {
    var merchi = new Merchi();
    var quote = new merchi.Quote();
    expect(function () { return quote.findQuoteItemIndex(43); }).toThrow();
    quote.quoteItems = [];
    expect(quote.findQuoteItemIndex(43)).toEqual(-1);
    quote.quoteItems = [new merchi.QuoteItem()];
    quote.quoteItems[0].id = 43;
    expect(quote.findQuoteItemIndex(43)).toEqual(0);
});
test('removeQuoteItem', function () {
    var merchi = new Merchi();
    var quote = new merchi.Quote();
    var quoteItem = new merchi.QuoteItem();
    quoteItem.id = 43;
    expect(function () { return quote.removeQuoteItem(quoteItem); }).toThrow();
    quoteItem.id = undefined;
    expect(function () { return quote.removeQuoteItem(quoteItem); }).toThrow();
    quoteItem.id = 43;
    quote.quoteItems = [];
    expect(quote.removeQuoteItem(quoteItem)).toBe(undefined);
    expect(quote.quoteItems).toEqual([]);
    quote.quoteItems = [quoteItem];
    expect(quote.removeQuoteItem(quoteItem)).toBe(undefined);
    expect(quote.quoteItems).toEqual([]);
    quoteItem.id = undefined;
    expect(function () { return quote.removeQuoteItem(quoteItem); }).toThrow();
});
test('deadlineTimeDifference', function () {
    var merchi = new Merchi();
    var quote = new merchi.Quote();
    expect(quote.deadlineTimeDifference).toThrow();
    quote.agreedDeadline = null;
    expect(quote.deadlineTimeDifference).toThrow();
    quote.assignments = [];
    expect(quote.deadlineTimeDifference()).toBe(null);
    quote.assignments = [new merchi.Assignment()];
    expect(quote.deadlineTimeDifference()).toBe(null);
    quote.agreedDeadline = new Date(1);
    expect(quote.deadlineTimeDifference).toThrow();
    quote.assignments[0].productionDeadline = new Date(2);
    expect(quote.deadlineTimeDifference()).toEqual(1);
});
