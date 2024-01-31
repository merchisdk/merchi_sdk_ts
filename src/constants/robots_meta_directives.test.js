import { robotsMetaDirectives } from './robots_meta_directives';
test('robot meta directive exists', function () {
    expect(robotsMetaDirectives[0]).toBe('noindex');
});
