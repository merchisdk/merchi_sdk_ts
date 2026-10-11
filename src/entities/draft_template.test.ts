import { Merchi } from '../merchi.js';

test('can make DraftTemplate', () => {
  const merchi = new Merchi();
  const draftTemplate = new merchi.DraftTemplate();
  expect(draftTemplate).toBeTruthy();
});

test('customisationMap accepts JSON object from server', () => {
  const merchi = new Merchi();
  const draftTemplate = new merchi.DraftTemplate();
  draftTemplate.fromJson({ customisationMap: { regions: [] } });
  expect(draftTemplate.customisationMap).toEqual({ regions: [] });
});

test('mask files can be embedded', () => {
  const merchi = new Merchi();
  const draftTemplate = new merchi.DraftTemplate();
  draftTemplate.fromJson({
    printAreaMask: { id: 'mask-print' },
    bodyColourMask: { id: 'mask-body' },
  });
  expect(draftTemplate.printAreaMask?.id).toBe('mask-print');
  expect(draftTemplate.bodyColourMask?.id).toBe('mask-body');
});
