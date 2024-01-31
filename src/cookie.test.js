import { getCookie } from './cookie';
test('can get cookie', function () {
    var token = 'IMiF7rpT$5ciUJ38QY';
    var cookie = "session_token=".concat(token);
    Object.defineProperty(document, 'cookie', {
        get: jest.fn().mockImplementation(function () { return cookie; }),
        set: jest.fn().mockImplementation(function () { }),
    });
    expect(getCookie('session_token')).toBe('IMiF7rpT$5ciUJ38QY');
});
