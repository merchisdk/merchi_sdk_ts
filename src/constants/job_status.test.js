import { DraftingStatus } from './job_status';
test('init drafting status exists', function () {
    expect(DraftingStatus.INIT).toBe(0);
});
