import { Merchi } from '../merchi.js';

test('can make JobOperationLog', () => {
  const merchi = new Merchi();
  const log = new merchi.JobOperationLog();
  expect(log).toBeTruthy();
});
