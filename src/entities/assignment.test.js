import { Merchi } from '../merchi';
import { setup, mockFetch } from '../test_util';
setup();
test('can make Assignment', function () {
    var merchi = new Merchi();
    var assignment = new merchi.Assignment();
    expect(assignment).toBeTruthy();
});
test('can generate new invoice', function () {
    mockFetch(true, { 'id': 1, 'totalCost': 100 }, 200);
    var merchi = new Merchi();
    var assignment = new merchi.Assignment();
    assignment.id = 1;
    assignment.generateInvoice().then(function (invoice) {
        expect(invoice.totalCost).toEqual(100);
        expect(invoice.id).toEqual(1);
    });
});
test('can add to invoice', function () {
    var fetch = mockFetch(true, { 'id': 2, 'totalCost': 100 }, 200);
    var merchi = new Merchi();
    var assignment = new merchi.Assignment();
    assignment.id = 1;
    assignment.generateInvoice({ addToInvoice: 2 }).then(function (invoice) {
        expect(invoice.totalCost).toEqual(100);
        expect(invoice.id).toEqual(2);
    });
    var correct = [['add_to_invoice', '2']];
    expect(Array.from(fetch.mock.calls[0][1]['query'])).toEqual(correct);
});
