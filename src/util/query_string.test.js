import { getQueryStringValue } from './query_string';
test('lol', function () {
    expect(getQueryStringValue('a')).toBe(undefined);
    history.replaceState({}, 'Test', '/test?a=3');
    expect(getQueryStringValue('a')).toBe('3');
});
