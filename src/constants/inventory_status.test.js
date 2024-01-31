import { InventoryStatus } from './inventory_statuses';
test('inventory deducted', function () {
    expect(InventoryStatus.DEDUCTED).toBe(0);
});
