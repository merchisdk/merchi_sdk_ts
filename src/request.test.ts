import { apiFetch } from './request.js';
import { ErrorType } from './constants/errors.js';
import { setup, mockFetch } from './test_util.js';

setup();

test('can pass through data from server', () => {
  mockFetch(true, {'animal': 'turtle'}, 200);
  return apiFetch('https://api.merchi.co/', '/test').then(data => {
    expect(data.animal).toBe('turtle');
  });
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
  apiFetch('https://api.merchi.co/', '/test').catch(e => {
    expect(e.statusCode).toBe(404);
    expect(e.name).toBe('ApiError');
    expect(e.errorCode).toBe(ErrorType.UNKNOWN_ERROR);
    expect(e.errorMessage).toBe('just a test');
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
