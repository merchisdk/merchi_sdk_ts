import { UserType } from './user_types';
test('not valid status exists', function () {
    expect(UserType.CLIENT_GUEST).toBe(1);
});
