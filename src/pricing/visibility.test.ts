import { resolveVisibleFields } from './visibility.js';
import { PricingRules } from './types.js';

function field(id: number, selectedBy: number[], options: number[] = []): any {
  return {
    id, originalId: id, position: 0, fieldType: 2, independent: true,
    isSelectable: true, selectedBy,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    options: options.map((oid) => ({
      id: oid, originalId: oid, position: 0, default: false,
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      selectedBy: [],
    })),
  };
}

const rules: PricingRules = {
  currency: 'AUD', taxPercent: 0,
  product: { unitPrice: 0, minimumPrice: null, discountGroup: null },
  fields: [
    field(1, [], [101, 102]),       // always visible, has options
    field(2, [101], [201]),          // visible only if option 101 selected
    field(3, [201], [301]),          // chained: visible if option 201 selected
  ],
  groupFields: [],
  hasGroups: false,
};

test('field with no selectedBy is always visible', () => {
  const v = resolveVisibleFields(rules, { fieldValues: {} });
  expect(v.has(1)).toBe(true);
  expect(v.has(2)).toBe(false);
  expect(v.has(3)).toBe(false);
});

test('conditional field appears when its trigger option is selected', () => {
  const v = resolveVisibleFields(rules, {
    fieldValues: { 1: { selectedOptionIds: [101] } },
  });
  expect(v.has(2)).toBe(true);
  expect(v.has(3)).toBe(false);
});

test('chained conditional field requires its parent to be fulfilled', () => {
  const v = resolveVisibleFields(rules, {
    fieldValues: { 1: { selectedOptionIds: [101] }, 2: { selectedOptionIds: [201] } },
  });
  expect(v.has(3)).toBe(true);
});

test('group field selections also drive visibility', () => {
  const groupRules: PricingRules = {
    ...rules, fields: [], hasGroups: true,
    groupFields: [field(10, [], [110]), field(11, [110], [111])],
  };
  const v = resolveVisibleFields(groupRules, {
    fieldValues: {},
    groups: [{ quantity: 5, fieldValues: { 10: { selectedOptionIds: [110] } } }],
  });
  expect(v.has(11)).toBe(true);
});

test('options/fields with null originalId still resolve by id', () => {
  const noOrigOption = {
    id: 401, originalId: null, position: 0, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy: [],
  };
  const trigger: any = {
    id: 40, originalId: null, position: 0, fieldType: 2, independent: true,
    isSelectable: true, selectedBy: [],
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    options: [noOrigOption],
  };
  const dependent = field(41, [401], []);
  const noOrigRules: PricingRules = { ...rules, fields: [trigger, dependent] };
  const v = resolveVisibleFields(noOrigRules, {
    fieldValues: { 40: { selectedOptionIds: [401] } },
  });
  expect(v.has(41)).toBe(true);
});

test('cyclic selectedBy references terminate via the checked guard', () => {
  function fieldWithOptSelectedBy(
    id: number, selectedBy: number[],
    opts: { id: number; selectedBy: number[] }[]
  ): any {
    return {
      id, originalId: id, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy,
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: opts.map((o) => ({
        id: o.id, originalId: o.id, position: 0, default: false,
        variationCost: 0, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        selectedBy: o.selectedBy,
      })),
    };
  }
  const cyclicRules: PricingRules = {
    ...rules,
    fields: [
      fieldWithOptSelectedBy(20, [], [{ id: 120, selectedBy: [121] }]),
      fieldWithOptSelectedBy(21, [], [{ id: 121, selectedBy: [120] }]),
      field(22, [120], []),
    ],
  };
  const v = resolveVisibleFields(cyclicRules, {
    fieldValues: { 20: { selectedOptionIds: [120] }, 21: { selectedOptionIds: [121] } },
  });
  expect(v.has(22)).toBe(true);
});

test('field selections without selectedOptionIds are ignored', () => {
  const v = resolveVisibleFields(rules, {
    fieldValues: { 1: { value: 'text-only' }, 9: undefined as any },
  });
  expect(v.has(1)).toBe(true);
  expect(v.has(2)).toBe(false);
});

test('missing fieldValues falls back to an empty selection map', () => {
  const v = resolveVisibleFields(rules, { fieldValues: undefined as any });
  expect(v.has(1)).toBe(true);
  expect(v.has(2)).toBe(false);
});

test('group without fieldValues falls back to an empty selection map', () => {
  const v = resolveVisibleFields(rules, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: undefined as any }],
  });
  expect(v.has(1)).toBe(true);
  expect(v.has(2)).toBe(false);
});
