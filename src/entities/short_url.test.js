import { Merchi } from '../merchi';
test('can make ShortUrl', function () {
    var merchi = new Merchi();
    var shortUrl = new merchi.ShortUrl();
    expect(shortUrl).toBeTruthy();
});
