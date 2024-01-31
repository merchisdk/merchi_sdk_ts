import { setup, mockFetch } from './test_util';
import { Merchi } from './merchi';
setup();
test('can get current user merchi has session token', function () {
    var testToken = 'YrDwzmh8&QGtAfg9quh(4QfSlE^RPXWl';
    var merchi = new Merchi(testToken);
    mockFetch(true, { session: { user: { name: 'currentUser' } } }, 200);
    return merchi
        .getCurrentUser()
        .then(function (user) { return expect(user.name).toBe('currentUser'); });
});
test('get current user return empty if there is no cookie', function () {
    Object.defineProperty(document, 'cookie', {
        get: jest.fn().mockImplementation(function () {
            return '';
        }),
    });
    var merchi = new Merchi();
    mockFetch(true, { user: { name: 'currentUser' } }, 200);
    return merchi.getCurrentUser({ embed: {} }).then(function (user) { return expect(user).toBe(null); });
});
