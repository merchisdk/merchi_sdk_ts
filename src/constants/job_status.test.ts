import { DraftingStatus } from './job_status.js';

test('init drafting status exists', () => {
  expect(DraftingStatus.INIT).toBe(0);
});
