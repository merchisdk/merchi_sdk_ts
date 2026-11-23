import { Merchi } from '../merchi.js';

test('can make Discount', () => {
  const merchi = new Merchi();
  const discount = new merchi.Discount();
  expect(discount).toBeTruthy();
});

test('can set assignedUsers', () => {
  const merchi = new Merchi();
  const discount = new merchi.Discount();
  const user = new merchi.User();
  user.id = 11;
  discount.assignedUsers = [user];
  expect(discount.assignedUsers?.map((assigned) => assigned.id)).toEqual([11]);
});

test('can set referrer', () => {
  const merchi = new Merchi();
  const discount = new merchi.Discount();
  const user = new merchi.User();
  user.id = 22;
  discount.referrer = user;
  expect(discount.referrer?.id).toEqual(22);
});

test('discountedUnitCost', () => {
  const merchi = new Merchi();
  const discount = new merchi.Discount();
  const product = new merchi.Product();
  expect(() => discount.discountedUnitCost(product.unitPrice)).toThrow();
  product.unitPrice = 200.8; 
  expect(() => discount.discountedUnitCost(product.unitPrice)).toThrow();
  discount.amount = 94.6;
  expect(discount.discountedUnitCost(product.unitPrice)).toEqual('10.843');
});
