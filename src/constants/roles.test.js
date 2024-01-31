import { Role } from './roles';
test('admin role exists', function () {
    expect(Role.ADMIN).toBe(1);
});
