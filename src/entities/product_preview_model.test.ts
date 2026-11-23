import { Merchi } from '../merchi.js';

test('can make ProductPreviewModel', () => {
  const merchi = new Merchi();
  const model = new merchi.ProductPreviewModel();
  expect(model).toBeTruthy();
  const surface = new merchi.ProductPreviewSurface();
  expect(surface).toBeTruthy();
});
