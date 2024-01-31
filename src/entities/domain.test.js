import { Merchi } from '../merchi';
import { setup, mockFetch } from '../test_util';
setup();
test('can make domain', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    expect(domain).toBeTruthy();
});
test('can get and set id', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    domain.id = 2;
    expect(domain.id).toBe(2);
});
test('can get and set domain', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    domain.domain = 'example.com';
    expect(domain.domain).toBe('example.com');
});
test('can create domain on server', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    domain.domain = 'example.com';
    var data = Array.from(domain.toFormData().entries());
    var fetch = mockFetch(true, {}, 201);
    domain.create();
    var sentToServer = Array.from(fetch.mock.calls[0][1]['body'].entries());
    expect(sentToServer).toEqual(data);
});
test('can delete domain', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    domain.id = 1;
    var fetch = mockFetch(true, {}, 204);
    domain.delete();
    expect(fetch.mock.calls[0][1].method).toBe('DELETE');
});
test('taxType', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    expect(domain.defaultTaxType).toThrow();
    domain.company = new merchi.Company();
    expect(domain.defaultTaxType).toThrow();
    var tax = new merchi.CountryTax();
    domain.company.defaultTaxType = tax;
    expect(domain.defaultTaxType()).toBe(tax);
    domain.company.defaultTaxType = null;
    expect(domain.defaultTaxType()).toBe(null);
});
test('can get domain active theme', function () {
    var merchi = new Merchi();
    var domain = new merchi.Domain();
    // throw error if active theme is undefined which seems to be an embed issue
    expect(function () { domain.getActiveTheme(); }).toThrow(Error);
    var theme = new merchi.Theme();
    domain.activeTheme = theme;
    expect(domain.getActiveTheme()).toEqual(theme);
});
test('fail to delete non-existant domain', function () {
    var merchi = new Merchi('YrDwzmh8&QGtAfg9quh(4QfSlE^RPXWl');
    var domain = new merchi.Domain();
    domain.id = -1;
    var fetch = mockFetch(true, { statusCode: 404 }, 404);
    var invocation = domain.delete();
    expect(fetch.mock.calls[0][1].method).toBe('DELETE');
    return invocation.catch(function (e) { return expect(e.statusCode).toEqual(404); });
});
