import { Merchi } from '../merchi.js';

test('can make ProductPreviewModel', () => {
  const merchi = new Merchi();
  const model = new merchi.ProductPreviewModel();
  expect(model).toBeTruthy();
  const surface = new merchi.ProductPreviewSurface();
  expect(surface).toBeTruthy();
});

test('parses a body surface whose template is null', () => {
  const merchi = new Merchi();
  const product = new merchi.Product().fromJson({
    id: 1,
    previewModels: [{
      id: 4,
      name: 'band',
      previewSurfaces: [
        {
          id: 8,
          materialName: 'Body',
          role: 'body',
          regionIndex: 0,
          draftTemplate: null,
        },
        {
          id: 9,
          materialName: 'Print_front_1',
          role: 'print',
          regionIndex: 0,
          draftTemplate: {id: 10, name: 'front'},
        },
      ],
    }],
  });
  const surfaces = product.previewModels![0].previewSurfaces!;
  expect(surfaces[0].draftTemplate).toBeNull();
  expect(surfaces[0].materialName).toBe('Body');
  expect(surfaces[1].draftTemplate!.id).toBe(10);
  expect(surfaces[1].draftTemplate!.previewSurfaces).toBeUndefined();
});
