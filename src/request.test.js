import { apiFetch } from './request';
import { ErrorType } from './constants/errors';
import { setup, mockFetch } from './test_util';
setup();
test('can pass through data from server', function () {
    mockFetch(true, { 'animal': 'turtle' }, 200);
    return apiFetch('/test').then(function (data) {
        expect(data.animal).toBe('turtle');
    });
});
test('can pass through data from server with override url', function () {
    window.merchiBackendUri = 'http://override.example.com/';
    mockFetch(true, { 'animal': 'turtle' }, 200);
    return apiFetch('/test').then(function (data) {
        expect(data.animal).toBe('turtle');
    });
});
test('404 creates ApiError', function () {
    mockFetch(false, { 'statusCode': 404, 'errorCode': ErrorType.RESOURCE_NOT_FOUND }, 404);
    apiFetch('/test').catch(function (e) {
        expect(e.statusCode).toBe(404);
        expect(e.name).toBe('ApiError');
        expect(e.errorCode).toBe(ErrorType.RESOURCE_NOT_FOUND);
        expect(e.errorMessage).toBe('No error message');
    });
});
test('will get default errorCode', function () {
    mockFetch(false, { 'statusCode': 404,
        'errorCode': -1,
        'message': 'just a test' }, 404);
    apiFetch('/test').catch(function (e) {
        expect(e.statusCode).toBe(404);
        expect(e.name).toBe('ApiError');
        expect(e.errorCode).toBe(ErrorType.UNKNOWN_ERROR);
        expect(e.errorMessage).toBe('just a test');
    });
});
