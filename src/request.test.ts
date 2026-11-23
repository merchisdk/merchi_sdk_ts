import { apiFetch, ApiError } from './request.js';
import { ErrorType } from './constants/errors.js';
import { Merchi } from './merchi.js';
import { setup, mockFetch } from './test_util.js';

setup();

test('can pass through data from server', () => {
  mockFetch(true, {'animal': 'turtle'}, 200);
  return apiFetch('https://api.merchi.co/', '/test').then(data => {
    expect(data.animal).toBe('turtle');
  });
});

test('serializes an explicit JSON payload through an authenticated request', async () => {
  const fetch = mockFetch(true, {}, 200);
  const merchi = new Merchi('test-session');
  const json = { address: { city: 'Melbourne' }, items: [{ id: 12 }] };
  const headers = new Headers({ 'X-Request-ID': 'test-request' });

  await merchi.authenticatedFetch('/test', { method: 'PATCH', json, headers });

  const [url, init] = fetch.mock.calls[0];
  expect(new URL(url).searchParams.get('session_token')).toBe('test-session');
  expect(init.method).toBe('PATCH');
  expect(init.body).toBe(JSON.stringify(json));
  expect(init.headers.get('Content-Type')).toBe('application/json');
  expect(init.headers.get('X-Request-ID')).toBe('test-request');
  expect(headers.has('Content-Type')).toBe(false);
});

test('honors an explicit JSON media type', async () => {
  const fetch = mockFetch(true, {}, 200);
  await apiFetch('https://api.merchi.co/', '/test', {
    method: 'PATCH',
    json: [],
    headers: { 'content-type': 'application/merge-patch+json' },
  });
  const init = fetch.mock.calls[0][1];
  expect(init.body).toBe('[]');
  expect(init.headers.get('Content-Type')).toBe('application/merge-patch+json');
});

test('preserves multipart and pre-encoded bodies', async () => {
  const fetch = mockFetch(true, {}, 200);
  const multipart = new FormData();
  multipart.set('file', new File(['test'], 'test.txt'));
  const preEncoded = '{ "rating": 5 }';
  const headers = { 'Content-Type': 'application/json' };

  await apiFetch('https://api.merchi.co/', '/test', { method: 'POST', body: multipart });
  await apiFetch('https://api.merchi.co/', '/test', { method: 'POST', body: preEncoded, headers });

  expect(fetch.mock.calls[0][1].body).toBe(multipart);
  expect(fetch.mock.calls[0][1].headers).toBeUndefined();
  expect(fetch.mock.calls[1][1].body).toBe(preEncoded);
  expect(fetch.mock.calls[1][1].headers).toBe(headers);
});

test('rejects combining an explicit JSON payload and a fetch body', () => {
  const fetch = mockFetch(true, {}, 200);
  expect(() => apiFetch('https://api.merchi.co/', '/test', {
    method: 'POST', json: {}, body: new FormData(),
  })).toThrow(TypeError);
  expect(fetch).not.toHaveBeenCalled();
});

test('can pass through data from server with override url', () => {
  (window as any).merchiBackendUri = 'http://override.example.com/';
  mockFetch(true, {'animal': 'turtle'}, 200);
  return apiFetch('https://api.merchi.co/', '/test').then(data => {
    expect(data.animal).toBe('turtle');
  });
});

test('404 creates ApiError', () => {
  mockFetch(false, {'statusCode': 404, 'errorCode': ErrorType.RESOURCE_NOT_FOUND}, 404);
  apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.statusCode).toBe(404);
    expect(e.name).toBe('ApiError');
    expect(e.errorCode).toBe(ErrorType.RESOURCE_NOT_FOUND);
    expect(e.errorMessage).toBe('No error message');
  });
});

test('will get default errorCode', () => {
  mockFetch(false,
    {'statusCode': 404,
      'errorCode': -1,
      'message': 'just a test'}, 404);
  return apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.statusCode).toBe(404);
    expect(e.name).toBe('ApiError');
    expect(e.errorCode).toBe(ErrorType.UNKNOWN_ERROR);
    expect(e.errorMessage).toBe('just a test');
    expect(e.message).toBe('just a test');
  });
});

test('ApiError keeps plain string messages', () => {
  const e = new ApiError('empty response');
  expect(e.message).toBe('empty response');
  expect(e.errorMessage).toBe('empty response');
});

test('ApiError.message is the human-readable text, not serialized JSON', () => {
  mockFetch(false, {
    'statusCode': 403,
    'errorCode': ErrorType.UNKNOWN_ERROR,
    'message': 'cannot set referrer',
  }, 403);
  return apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.message).toBe('cannot set referrer');
    expect(e.errorMessage).toBe('cannot set referrer');
    expect(e.message).not.toContain('errorCode');
    expect(e.message).not.toContain('statusCode');
  });
});

test('ApiError exposes details when the server supplies them', () => {
  const details = {
    relation: 'file',
    parentType: 'variation',
    id: 'abc123',
    index: 0,
    provided: {
      id: 'abc123',
      uploadId: 'upload-xyz',
      creationDate: '1776978388',
    },
  };
  mockFetch(false, {
    'statusCode': 404,
    'errorCode': ErrorType.RESOURCE_NOT_FOUND,
    'message': 'no such file #abc123 on variation',
    'details': details,
  }, 404);
  return apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.name).toBe('ApiError');
    expect(e.details).toEqual(details);
    expect(e.details.provided.uploadId).toBe('upload-xyz');
  });
});

test('ApiError leaves details undefined when the server omits them', () => {
  mockFetch(false,
    {'statusCode': 400,
      'errorCode': ErrorType.RESOURCE_NOT_FOUND,
      'message': 'plain error'}, 400);
  return apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.name).toBe('ApiError');
    expect(e.details).toBeUndefined();
  });
});
