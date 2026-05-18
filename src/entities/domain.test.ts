import { Merchi } from '../merchi.js';
import { setup, mockFetch } from '../test_util.js';

setup();

test('can make domain', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  expect(domain).toBeTruthy();
});

test('can get and set id', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 2;
  expect(domain.id).toBe(2);
});

test('can get and set domain', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.domain = 'example.com';
  expect(domain.domain).toBe('example.com');
});

test('can create domain on server', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.domain = 'example.com';
  const data = Array.from((domain.toFormData() as any).entries());
  const fetch = mockFetch(true, {}, 201);
  domain.create();
  const sentToServer = Array.from(fetch.mock.calls[0][1]['body'].entries());
  expect(sentToServer).toEqual(data);
});

test('can delete domain', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 1;
  const fetch = mockFetch(true, {}, 204);
  domain.delete();
  expect(fetch.mock.calls[0][1].method).toBe('DELETE');
});

test('taxType', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  expect(domain.defaultTaxType).toThrow();
  domain.company = new merchi.Company();
  expect(domain.defaultTaxType).toThrow();
  const tax = new merchi.CountryTax();
  domain.company.defaultTaxType = tax;
  expect(domain.defaultTaxType()).toBe(tax);
  domain.company.defaultTaxType = null;
  expect(domain.defaultTaxType()).toBe(null);
});

test('can get domain active theme', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();

  // throw error if active theme is undefined which seems to be an embed issue
  expect(() => {domain.getActiveTheme();}).toThrow(Error);

  const theme = new merchi.Theme();
  domain.activeTheme = theme;
  expect(domain.getActiveTheme()).toEqual(theme);
});

test('fail to delete non-existant domain', () => {
  const merchi = new Merchi('YrDwzmh8&QGtAfg9quh(4QfSlE^RPXWl');
  const domain = new merchi.Domain();
  domain.id = -1;
  const fetch = mockFetch(true, {statusCode: 404}, 404);
  const invocation = domain.delete();
  expect(fetch.mock.calls[0][1].method).toBe('DELETE');
  return invocation.catch(e => expect(e.statusCode).toEqual(404));
});

test('can get storefront v2 config', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontV2();
  const fetchUrl = fetch.mock.calls[0][0];
  const query = fetch.mock.calls[0][1].query;
  expect(fetch.mock.calls[0][1].method).toBe('GET');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/');
  expect(query).toContainEqual(['skip_rights', 'y']);
});

test('can provision storefront v2', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.provisionStorefrontV2({force: true});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/provision/');
  expect(body).toEqual({force: true});
});

test('can create storefront v2 change request', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.createStorefrontChangeRequest({prompt: 'update hero'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/requests/');
  expect(body).toEqual({prompt: 'update hero'});
});

test('can get storefront v2 change request by id', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontChangeRequest(9);
  const fetchUrl = fetch.mock.calls[0][0];
  expect(fetch.mock.calls[0][1].method).toBe('GET');
  expect(fetchUrl).toContain('/storefront_change_requests/9/');
});

test('can run storefront v2 change request', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  const fetch = mockFetch(true, {}, 200);
  domain.runStorefrontChangeRequest(9, {
    status: 'running',
    pullRequestNumber: 42,
    checksSummary: {
      overall: 'passing',
      counts: {total: 4, passed: 4, failed: 0, pending: 0, neutral: 0},
    },
    checksUpdatedAt: '2026-05-15T00:00:00Z',
  });
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/storefront_change_requests/9/run/');
  expect(body).toEqual({
    status: 'running',
    pullRequestNumber: 42,
    checksSummary: {
      overall: 'passing',
      counts: {total: 4, passed: 4, failed: 0, pending: 0, neutral: 0},
    },
    checksUpdatedAt: '2026-05-15T00:00:00Z',
  });
});

test('can approve storefront v2 change request', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  const fetch = mockFetch(true, {}, 200);
  domain.approveStorefrontChangeRequest(9, {comment: 'looks good'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/storefront_change_requests/9/approve/');
  expect(body).toEqual({comment: 'looks good'});
});

test('can reject storefront v2 change request', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  const fetch = mockFetch(true, {}, 200);
  domain.rejectStorefrontChangeRequest(9, {reason: 'needs edits'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/storefront_change_requests/9/reject/');
  expect(body).toEqual({reason: 'needs edits'});
});

test('can get storefront v2 deployments', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontV2Deployments();
  const fetchUrl = fetch.mock.calls[0][0];
  expect(fetch.mock.calls[0][1].method).toBe('GET');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/deployments/');
});

test('can get storefront v2 deployment logs', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontV2DeploymentLogs('dep_123');
  const fetchUrl = fetch.mock.calls[0][0];
  expect(fetch.mock.calls[0][1].method).toBe('GET');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/deployments/dep_123/logs/');
});

test('can rollback storefront v2 deployment', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.rollbackStorefrontV2({deploymentId: 'dep_123'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/rollback/');
  expect(body).toEqual({deploymentId: 'dep_123'});
});
