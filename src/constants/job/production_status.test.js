import { ProductionStatus } from './production_status';
test('init status exists', function () {
    expect(ProductionStatus.INIT).toBe(0);
});
