import { Merchi } from '../merchi.js';

test('can make CompanyTag', () => {
  const merchi = new Merchi();
  const companyTag = new merchi.CompanyTag();
  expect(companyTag).toBeTruthy();
});
