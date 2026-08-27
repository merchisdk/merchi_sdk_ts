import { buildPriceMatrix } from './matrix.js';
import { PricingField, PricingRules } from './types.js';

function field(partial: Partial<PricingField> & { id: number }): PricingField {
  return {
    originalId: partial.id,
    position: 0,
    fieldType: 2,
    independent: true,
    isSelectable: true,
    selectedBy: [],
    variationCost: 0,
    variationUnitCost: 0,
    variationCostDiscountGroup: null,
    variationUnitCostDiscountGroup: null,
    options: [],
    ...partial,
  };
}

const base: PricingRules = {
  currency: 'AUD',
  taxPercent: 10,
  product: { unitPrice: 10, minimumPrice: null, discountGroup: null },
  fields: [],
  groupFields: [],
  hasGroups: false,
};

test('unsupported rules yield no matrix', () => {
  expect(
    buildPriceMatrix({ ...base, unsupported: 'group_buy_product' })
  ).toBeNull();
});

test('no quantity breaks yield no matrix', () => {
  expect(buildPriceMatrix(base, { quantity: 1, fieldValues: {} })).toBeNull();
});

test('product quantity breaks become columns', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [
          { lowerLimit: 100, amount: 10 },
          { lowerLimit: 500, amount: 20 },
        ],
      },
    },
  };
  const matrix = buildPriceMatrix(rules);
  expect(matrix).toMatchObject({
    currency: 'AUD',
    taxPercent: 10,
    bands: [
      { quantity: 1, upperLimit: 99, label: '1–99' },
      { quantity: 100, upperLimit: 499, label: '100–499' },
      { quantity: 500, upperLimit: null, label: '500+' },
    ],
  });
  expect(matrix!.cells.map((c) => c.costPerUnit)).toEqual([10, 9, 8]);
  expect(matrix!.cells[0].unitPrice).toBe(10);
  expect(matrix!.cells[1].cost).toBe(900);
  expect(matrix!.cells[1].taxAmount).toBe(90);
  expect(matrix!.cells[1].totalCost).toBe(990);
});

test('minQuantity floors the first band and ignores lower breaks', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [
          { lowerLimit: 25, amount: 5 },
          { lowerLimit: 100, amount: 10 },
        ],
      },
    },
  };
  const matrix = buildPriceMatrix(rules, { fieldValues: {} }, { minQuantity: 50 });
  expect(matrix!.bands.map((b) => b.quantity)).toEqual([50, 100]);
  expect(matrix!.bands[0].label).toBe('50–99');
});

test('minQuantity below 1 is treated as 1', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  const matrix = buildPriceMatrix(rules, { fieldValues: {} }, { minQuantity: 0 });
  expect(matrix!.bands[0].quantity).toBe(1);
});

test('invalid discount limits are ignored', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [
          { lowerLimit: Number.NaN, amount: 10 },
          { lowerLimit: 20, amount: 10 },
        ],
      },
    },
  };
  expect(buildPriceMatrix(rules)!.bands.map((b) => b.quantity)).toEqual([1, 20]);
});

test('field and option discount groups contribute breaks', () => {
  const rules: PricingRules = {
    ...base,
    fields: [
      field({
        id: 2,
        fieldType: 5,
        isSelectable: false,
        variationUnitCost: 2,
        variationUnitCostDiscountGroup: {
          groupRestricted: false,
          discounts: [{ lowerLimit: 50, amount: 50 }],
        },
      }),
      field({
        id: 1,
        options: [
          {
            id: 101,
            originalId: 101,
            position: 0,
            default: true,
            variationCost: 20,
            variationUnitCost: 0,
            variationCostDiscountGroup: {
              groupRestricted: false,
              discounts: [{ lowerLimit: 80, amount: 50 }],
            },
            variationUnitCostDiscountGroup: null,
            selectedBy: [],
          },
        ],
      }),
    ],
  };
  const matrix = buildPriceMatrix(rules, {
    quantity: 1,
    fieldValues: {
      1: { selectedOptionIds: [101] },
      2: { value: 'yes' },
    },
  });
  expect(matrix!.bands.map((b) => b.quantity)).toEqual([1, 50, 80]);
});

test('area edge discount groups contribute breaks', () => {
  const rules: PricingRules = {
    ...base,
    fields: [
      field({
        id: 14,
        fieldType: 14,
        isSelectable: false,
        heightVariationCost: 2,
        widthVariationCost: 2,
        heightVariationUnitCost: 1,
        widthVariationUnitCost: 1,
        heightVariationCostDiscountGroup: {
          groupRestricted: false,
          discounts: [{ lowerLimit: 12, amount: 10 }],
        },
        heightVariationUnitCostDiscountGroup: {
          groupRestricted: false,
          discounts: [{ lowerLimit: 13, amount: 10 }],
        },
        widthVariationCostDiscountGroup: {
          groupRestricted: false,
          discounts: [{ lowerLimit: 14, amount: 10 }],
        },
        widthVariationUnitCostDiscountGroup: {
          groupRestricted: false,
          discounts: [{ lowerLimit: 15, amount: 10 }],
        },
      }),
    ],
  };
  const matrix = buildPriceMatrix(rules, {
    quantity: 1,
    fieldValues: { 14: { value: '100,200' } },
  });
  expect(matrix!.bands.map((b) => b.quantity)).toEqual([1, 12, 13, 14, 15]);
});

test('unused option breaks that do not change price are collapsed', () => {
  const rules: PricingRules = {
    ...base,
    fields: [
      field({
        id: 1,
        options: [
          {
            id: 101,
            originalId: 101,
            position: 0,
            default: false,
            variationCost: 0,
            variationUnitCost: 5,
            variationCostDiscountGroup: null,
            variationUnitCostDiscountGroup: {
              groupRestricted: false,
              discounts: [{ lowerLimit: 100, amount: 50 }],
            },
            selectedBy: [],
          },
        ],
      }),
    ],
  };
  expect(
    buildPriceMatrix(rules, { quantity: 1, fieldValues: {} })
  ).toBeNull();
});

test('adjacent quantities use a single-number label', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 2, amount: 10 }],
      },
    },
  };
  expect(buildPriceMatrix(rules)!.bands[0]).toMatchObject({
    quantity: 1,
    upperLimit: 1,
    label: '1',
  });
});

test('empty discount groups and missing field arrays are skipped', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: { groupRestricted: false, discounts: [] },
    },
    fields: undefined as any,
    groupFields: undefined as any,
  };
  expect(buildPriceMatrix(rules)).toBeNull();
});

test('null discount group on a field is skipped', () => {
  const rules: PricingRules = {
    ...base,
    fields: [
      field({
        id: 1,
        options: undefined as any,
        variationCostDiscountGroup: { groupRestricted: false } as any,
      }),
    ],
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 25, amount: 10 }],
      },
    },
  };
  expect(buildPriceMatrix(rules)!.bands.map((b) => b.quantity)).toEqual([1, 25]);
});

test('group products scale the current mix to each band', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 100, amount: 10 }],
      },
    },
    groupFields: [
      field({
        id: 4,
        independent: false,
        options: [
          {
            id: 201,
            originalId: 201,
            position: 0,
            default: false,
            variationCost: 0,
            variationUnitCost: 1,
            variationCostDiscountGroup: null,
            variationUnitCostDiscountGroup: null,
            selectedBy: [],
          },
        ],
      }),
    ],
  };
  const matrix = buildPriceMatrix(rules, {
    fieldValues: {},
    groups: [
      { quantity: 10, fieldValues: { 4: { selectedOptionIds: [201] } } },
      { quantity: 10, fieldValues: {} },
    ],
  });
  expect(matrix!.cells[1].quantity).toBe(100);
  expect(matrix!.cells[1].cost).toBe(950);
});

test('empty group quantities use the group that has values', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 20, amount: 10 }],
      },
    },
    groupFields: [
      field({
        id: 4,
        independent: false,
        options: [
          {
            id: 201,
            originalId: 201,
            position: 0,
            default: false,
            variationCost: 0,
            variationUnitCost: 2,
            variationCostDiscountGroup: null,
            variationUnitCostDiscountGroup: null,
            selectedBy: [],
          },
        ],
      }),
    ],
  };
  const matrix = buildPriceMatrix(rules, {
    fieldValues: {},
    groups: [
      { quantity: 0, fieldValues: {} },
      { quantity: 0, fieldValues: { 4: { selectedOptionIds: [201] } } },
    ],
  });
  expect(matrix!.cells[0].unitPrice).toBe(12);
});

test('empty group values fall back to the first group', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 20, amount: 10 }],
      },
    },
  };
  const matrix = buildPriceMatrix(rules, {
    fieldValues: {},
    groups: [
      { quantity: 0, fieldValues: { 1: { selectedOptionIds: [] }, 3: undefined as any } },
      { quantity: 0, fieldValues: { 2: { value: 0 } } },
    ],
  });
  expect(matrix!.cells[0].costPerUnit).toBe(10);
});

test('single group receives the full band quantity', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  const matrix = buildPriceMatrix(rules, {
    fieldValues: {},
    groups: [{ quantity: 4, fieldValues: { 9: { value: 'logo' } } }],
  });
  expect(matrix!.cells[1].cost).toBe(90);
});

test('scaled groups never assign a negative remainder', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 1, amount: 0 }, { lowerLimit: 2, amount: 10 }],
      },
    },
  };
  const matrix = buildPriceMatrix(
    rules,
    {
      fieldValues: {},
      groups: [
        { quantity: 99, fieldValues: {} },
        { quantity: 1, fieldValues: {} },
      ],
    },
    { minQuantity: 1 }
  );
  expect(matrix!.cells[0].quantity).toBe(1);
});

test('missing fieldValues on selections defaults to empty', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  expect(
    buildPriceMatrix(rules, { groups: [{ quantity: 0, fieldValues: undefined as any }] } as any)!.cells[0].cost
  ).toBe(10);
  expect(
    buildPriceMatrix(rules, {
      groups: [
        { quantity: 3, fieldValues: {} },
        { quantity: 3, fieldValues: {} },
      ],
    } as any)!.cells[0].cost
  ).toBe(10);
});

test('group fields with missing options still quote', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    groupFields: [field({ id: 4, independent: false, options: undefined as any })],
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  expect(
    buildPriceMatrix(rules, {
      fieldValues: {},
      groups: [{ quantity: 5, fieldValues: { 4: { value: 'custom' } } }],
    })!.cells[1].cost
  ).toBe(90);
});

test('setup amortization keeps bands when unit price changes', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      setupPrice: 50,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 100, amount: 0 }],
      },
    },
  };
  const matrix = buildPriceMatrix(rules);
  expect(matrix!.cells.map((c) => c.quantity)).toEqual([1, 100]);
  expect(matrix!.cells[0].costPerUnit).toBe(10);
  expect(matrix!.cells[1].costPerUnit).toBe(10);
});

test('empty groups array quotes as a non-group job', () => {
  const rules: PricingRules = {
    ...base,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  expect(
    buildPriceMatrix(rules, { groups: [] } as any)!.cells[1].cost
  ).toBe(90);
});

test('non-numeric group quantity is treated as zero', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10,
      minimumPrice: null,
      discountGroup: {
        groupRestricted: false,
        discounts: [{ lowerLimit: 10, amount: 10 }],
      },
    },
  };
  const matrix = buildPriceMatrix(rules, {
    fieldValues: {},
    groups: [
      { quantity: 'nope' as any, fieldValues: { 1: { value: null } } },
      { quantity: undefined as any, fieldValues: { 2: { value: '' } } },
    ],
  });
  expect(matrix!.cells[0].costPerUnit).toBe(10);
});
