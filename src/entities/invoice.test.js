import { setup, mockFetch } from '../test_util';
import { Merchi } from '../merchi';
setup();
test('can make Invoice', function () {
    var merchi = new Merchi();
    var invoice = new merchi.Invoice();
    expect(invoice).toBeTruthy();
});
test('pass cookie tokens to query string', function () {
    var cookie = 'session_token=s; client_token=c; invoice_token=i';
    Object.defineProperty(document, 'cookie', {
        get: jest.fn().mockImplementation(function () { return cookie; }),
        set: jest.fn().mockImplementation(function () { }),
    });
    var correct = [
        ['skip_rights', 'y'],
        ['session_token', 's'],
        ['client_token', 'c'],
        ['invoice_token', 'i'],
    ];
    var fetch = mockFetch(true, { 'invoice': { 'id': 1 } }, 200);
    var merchi = new Merchi();
    var invocation = merchi.Invoice.get(1);
    expect(fetch.mock.calls[0][1]['query']).toEqual(correct);
    return invocation;
});
test('client and invoice tokens supported by merchi', function () {
    var merchi = new Merchi('s', 'c', 'i');
    var correct = [
        ['skip_rights', 'y'],
        ['session_token', 's'],
        ['client_token', 'c'],
        ['invoice_token', 'i'],
    ];
    var fetch = mockFetch(true, { 'invoice': { 'id': 1 } }, 200);
    var invocation = merchi.Invoice.get(1);
    expect(fetch.mock.calls[0][1]['query']).toEqual(correct);
    return invocation;
});
