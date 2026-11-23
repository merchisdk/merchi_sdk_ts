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
