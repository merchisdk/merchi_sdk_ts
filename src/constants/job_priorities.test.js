import { JobPriority } from './job_priorities';
test('urgent priority exists', function () {
    expect(JobPriority.URGENT).toBe(1);
});
