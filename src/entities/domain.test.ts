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
  domain.provisionStorefrontV2({
    starterTemplate: 'merchi/storefront-v2-starter',
    urlStructure: '/products/:product',
  });
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/provision/');
  expect(body).toEqual({
    starterTemplate: 'merchi/storefront-v2-starter',
    urlStructure: '/products/:product',
  });
});

test('can extract storefront v2 site context', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.extractStorefrontV2SiteContext({url: 'https://example.com'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/site_context/extract/');
  expect(body).toEqual({url: 'https://example.com'});
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

test('can create storefront v2 change request with context payload', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.createStorefrontChangeRequest({
    prompt: 'update hero',
    contextFilePaths: ['src/app/page.tsx', 'components/hero.tsx'],
    contextImages: [
      {
        name: 'hero-ref.png',
        mimeType: 'image/png',
        dataUrl: 'data:image/png;base64,abc123',
      },
    ],
  });
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/requests/');
  expect(body).toEqual({
    prompt: 'update hero',
    contextFilePaths: ['src/app/page.tsx', 'components/hero.tsx'],
    contextImages: [
      {
        name: 'hero-ref.png',
        mimeType: 'image/png',
        dataUrl: 'data:image/png;base64,abc123',
      },
    ],
  });
});

test('can create storefront v2 change request with clarification payload', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.createStorefrontChangeRequest({
    prompt: 'generate storefront',
    startNewBranch: true,
    clarificationAnswers: {'nav-style': 'simplify-to-starter-header'},
    generationBriefSummary: 'Refresh homepage hero.',
    generationBoilerplateFit: 'Starter header maps to source nav.',
    clarificationSkipped: false,
  });
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(body).toEqual({
    prompt: 'generate storefront',
    startNewBranch: true,
    clarificationAnswers: {'nav-style': 'simplify-to-starter-header'},
    generationBriefSummary: 'Refresh homepage hero.',
    generationBoilerplateFit: 'Starter header maps to source nav.',
    clarificationSkipped: false,
  });
});

test('can create storefront v2 generation brief', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.createStorefrontV2GenerationBrief({
    siteContext: {sourceUrl: 'https://example.com'},
    urlStructure: '/:category/:product',
  });
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetchUrl).toContain('/domains/42/storefront_v2/generation_brief/');
  expect(body.siteContext.sourceUrl).toBe('https://example.com');
  expect(body.urlStructure).toBe('/:category/:product');
});

test('can resolve starter template url structure', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.resolveStarterTemplateUrlStructure({
    starterTemplate: 'merchi/storefront-v2-starter',
  });
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetchUrl).toContain('/domains/42/storefront_v2/starter_template/url_structure/');
  expect(body.starterTemplate).toBe('merchi/storefront-v2-starter');
});

test('can reset storefront v2', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.resetStorefrontV2();
  expect(fetch.mock.calls[0][0]).toContain('/domains/42/storefront_v2/reset/');
  expect(fetch.mock.calls[0][1].method).toBe('POST');
});

test('can get storefront v2 repository tree with query params', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontV2RepositoryTree({path: 'src', ref: 'main'});
  expect(fetch.mock.calls[0][0]).toContain('/domains/42/storefront_v2/repository_tree/');
  expect(fetch.mock.calls[0][1].query).toContainEqual(['path', 'src']);
  expect(fetch.mock.calls[0][1].query).toContainEqual(['ref', 'main']);
});

test('can publish storefront v2 product', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  domain.id = 42;
  const fetch = mockFetch(true, {}, 200);
  domain.publishStorefrontV2Product({productName: 'Wristband'});
  expect(fetch.mock.calls[0][0]).toContain('/domains/42/storefront_v2/products/publish/');
  expect(JSON.parse(fetch.mock.calls[0][1].body as string)).toEqual({
    productName: 'Wristband',
  });
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

test('can get storefront v2 change request events by id', () => {
  const merchi = new Merchi();
  const domain = new merchi.Domain();
  const fetch = mockFetch(true, {}, 200);
  domain.getStorefrontChangeRequestEvents(9);
  const fetchUrl = fetch.mock.calls[0][0];
  expect(fetch.mock.calls[0][1].method).toBe('GET');
  expect(fetchUrl).toContain('/storefront_change_requests/9/events/');
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
  domain.rejectStorefrontChangeRequest(9, {errorDetails: 'needs edits'});
  const fetchUrl = fetch.mock.calls[0][0];
  const body = JSON.parse(fetch.mock.calls[0][1].body as string);
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/storefront_change_requests/9/reject/');
  expect(body).toEqual({errorDetails: 'needs edits'});
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
  domain.rollbackStorefrontV2();
  const fetchUrl = fetch.mock.calls[0][0];
  expect(fetch.mock.calls[0][1].method).toBe('POST');
  expect(fetchUrl).toContain('/domains/42/storefront_v2/rollback/');
});
