import { estimateQuote } from './estimate.js';
import { PricingRules, QuoteResult } from './types.js';

const base: PricingRules = {
  currency: 'AUD', taxPercent: 10,
  product: { unitPrice: 10, minimumPrice: null, discountGroup: null },
  fields: [], groupFields: [], hasGroups: false,
};

test('returns unsupported when rules flag it', () => {
  const r = estimateQuote({ ...base, unsupported: 'group_buy_product' }, { quantity: 5, fieldValues: {} });
  expect(r).toEqual({ unsupported: 'group_buy_product' });
});

test('simple linear price + tax', () => {
  const r = estimateQuote(base, { quantity: 5, fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(50);
  expect(r.taxAmount).toBe(5);
  expect(r.totalCost).toBe(55);
  expect(r.costPerUnit).toBe(10);
  expect(r.currency).toBe('AUD');
});

test('minimum price floor raises unit price', () => {
  const rules = { ...base, product: { unitPrice: 10, minimumPrice: 80, discountGroup: null } };
  const r = estimateQuote(rules, { quantity: 5, fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(80);
});

test('quantity-break discount applied', () => {
  const rules = {
    ...base,
    product: {
      unitPrice: 10, minimumPrice: null,
      discountGroup: { groupRestricted: false, discounts: [{ lowerLimit: 100, amount: 10 }] },
    },
  };
  const r = estimateQuote(rules, { quantity: 100, fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(900);
});

test('selectable field option setup + unit cost', () => {
  const rules: PricingRules = {
    ...base,
    fields: [{
      id: 1, originalId: 1, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [],
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [{
        id: 101, originalId: 101, position: 0, default: false,
        variationCost: 5, variationUnitCost: 0.5,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        selectedBy: [],
      }],
    }],
  };
  const r = estimateQuote(rules, { quantity: 10, fieldValues: { 1: { selectedOptionIds: [101] } } }) as QuoteResult;
  expect(r.cost).toBe(110); // 10*10 + 5 + 0.5*10
});

test('hidden conditional field is not costed', () => {
  const rules: PricingRules = {
    ...base,
    fields: [{
      id: 2, originalId: 2, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [999],
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [{
        id: 201, originalId: 201, position: 0, default: false,
        variationCost: 7, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        selectedBy: [],
      }],
    }],
  };
  const r = estimateQuote(rules, { quantity: 10, fieldValues: { 2: { selectedOptionIds: [201] } } }) as QuoteResult;
  expect(r.cost).toBe(100);
});

test('non-selectable field with value adds field cost; empty adds nothing', () => {
  const mk = (sel: any) => {
    const rules: PricingRules = {
      ...base,
      fields: [{
        id: 3, originalId: 3, position: 0, fieldType: 5, independent: true,
        isSelectable: false, selectedBy: [],
        variationCost: 4, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [],
      }],
    };
    return estimateQuote(rules, { quantity: 10, fieldValues: { 3: sel } }) as QuoteResult;
  };
  expect(mk({ value: 'hello' }).cost).toBe(104);
  expect(mk({ value: '' }).cost).toBe(100);
  expect(mk(undefined as any).cost).toBe(100);
  // Server `is_empty` uses `not self.value`: numeric 0 is empty, string '0' is not.
  expect(mk({ value: 0 }).cost).toBe(100);
  expect(mk({ value: '0' }).cost).toBe(104);
});

test('tax computed from unrounded cost, not rounded cost (non-10% rate)', () => {
  const rules: PricingRules = {
    ...base,
    taxPercent: 33,
    fields: [{
      id: 7, originalId: 7, position: 0, fieldType: 5, independent: true,
      isSelectable: false, selectedBy: [],
      variationCost: 0.075, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [],
    }],
  };
  const r = estimateQuote(rules, { quantity: 10, fieldValues: { 7: { value: 'x' } } }) as QuoteResult;
  // unrounded cost = 100 + 0.075 = 100.075
  expect(r.cost).toBe(100.08); // roundHalfEven(100.075, 2)
  // tax from UNROUNDED: round(100.075*0.33, 2) = round(33.02475, 2) = 33.02
  // (the buggy round(round(100.075,2)*0.33,2) would give 33.03)
  expect(r.taxAmount).toBe(33.02);
  expect(r.totalCost).toBe(133.1); // round(100.075 + 33.02475, 3)
});

test('zero-qty group adds no field cost even when a visible field has value', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    groupFields: [
      {
        id: 50, originalId: 50, position: 0, fieldType: 5, independent: false,
        isSelectable: false, selectedBy: [],
        variationCost: 20, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [],
      },
      {
        // hidden conditional group field: skipped in the non-zero-qty group too
        id: 51, originalId: 51, position: 1, fieldType: 5, independent: false,
        isSelectable: false, selectedBy: [888],
        variationCost: 99, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [],
      },
    ],
  };
  const r = estimateQuote(rules, {
    fieldValues: {},
    groups: [
      { quantity: 0, fieldValues: { 50: { value: 'present' } } },
      { quantity: 5, fieldValues: {} },
    ],
  }) as QuoteResult;
  // zero-qty group contributes exactly 0 (no +20 setup); other group: 5*10 = 50
  expect(r.groupCosts).toEqual([0, 50]);
  expect(r.cost).toBe(50);
});

test('groupCost preserves 3rd-decimal precision', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    groupFields: [{
      id: 60, originalId: 60, position: 0, fieldType: 5, independent: false,
      isSelectable: false, selectedBy: [],
      variationCost: 0, variationUnitCost: 0.001,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [],
    }],
  };
  const r = estimateQuote(rules, {
    fieldValues: {},
    groups: [{ quantity: 3, fieldValues: { 60: { value: 'x' } } }],
  }) as QuoteResult;
  // groupCost = 3*10 + 0.001*3 = 30.003, serialized at 3dp (not 2dp)
  expect(r.groupCosts).toEqual([30.003]);
});

test('group product: weighted unit price and summed group costs', () => {
  const rules: PricingRules = { ...base, hasGroups: true };
  const r = estimateQuote(rules, {
    fieldValues: {},
    groups: [{ quantity: 3, fieldValues: {} }, { quantity: 7, fieldValues: {} }],
  }) as QuoteResult;
  expect(r.cost).toBe(100);
  expect(r.groupCosts).toEqual([30, 70]);
  expect(r.costPerUnit).toBe(10);
});

test('group product with no groups array: zero cost', () => {
  const rules: PricingRules = { ...base, hasGroups: true };
  const r = estimateQuote(rules, { fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(0);
  expect(r.costPerUnit).toBe(10);
});

test('zero quantity yields zero cost and no NaN unit price', () => {
  const r = estimateQuote(base, { quantity: 0, fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(0);
  expect(r.costPerUnit).toBe(10);
});

test('missing quantity treated as zero', () => {
  const r = estimateQuote(base, { fieldValues: {} }) as QuoteResult;
  expect(r.cost).toBe(0);
});

test('option setup + unit-cost discount groups (non-restricted) applied', () => {
  const dg = { groupRestricted: false, discounts: [{ lowerLimit: 5, amount: 50 }] };
  const rules: PricingRules = {
    ...base,
    fields: [{
      id: 1, originalId: 1, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [],
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [{
        id: 101, originalId: 101, position: 0, default: false,
        variationCost: 10, variationUnitCost: 2,
        variationCostDiscountGroup: dg, variationUnitCostDiscountGroup: dg,
        selectedBy: [],
      }],
    }],
  };
  const r = estimateQuote(rules, { quantity: 10, fieldValues: { 1: { selectedOptionIds: [101] } } }) as QuoteResult;
  // setup: 10 * (1-0.5) = 5; unit: 2 * 0.5 = 1 -> 1*10 = 10; base 100
  expect(r.cost).toBe(115);
});

test('unknown selectedOptionId is skipped; originalId lookup matches', () => {
  const rules: PricingRules = {
    ...base,
    fields: [{
      id: 1, originalId: 1, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [],
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [{
        id: 101, originalId: 999, position: 0, default: false,
        variationCost: 3, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        selectedBy: [],
      }],
    }],
  };
  // 999 resolves via originalId (+3 setup); 555 is unknown and skipped
  const r = estimateQuote(rules, { quantity: 10, fieldValues: { 1: { selectedOptionIds: [999, 555] } } }) as QuoteResult;
  expect(r.cost).toBe(103);
});

test('group product: group fields and group-restricted independent unit cost', () => {
  const restrictedDg = { groupRestricted: true, discounts: [{ lowerLimit: 5, amount: 50 }] };
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    groupFields: [{
      id: 10, originalId: 10, position: 0, fieldType: 5, independent: false,
      isSelectable: false, selectedBy: [],
      variationCost: 4, variationUnitCost: 1,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [],
    }],
    fields: [{
      id: 20, originalId: 20, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [],
      variationCost: 0, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [{
        id: 120, originalId: 120, position: 0, default: false,
        variationCost: 0, variationUnitCost: 2,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: restrictedDg,
        selectedBy: [],
      }],
    }],
  };
  const r = estimateQuote(rules, {
    fieldValues: { 20: { selectedOptionIds: [120] } },
    groups: [
      { quantity: 3, fieldValues: { 10: { value: 'x' } } },
      { quantity: 7, fieldValues: {} },
    ],
  }) as QuoteResult;
  // groups base: 3*10 + (4 + 1*3) = 30 + 7 = 37; 7*10 = 70 -> groupCosts [37,70]
  // independent restricted unit: q3<5 -> 2, q7>=5 -> 1; total 2*3 + 1*7 = 13
  // cost = 37 + 70 + 13 = 120
  expect(r.groupCosts).toEqual([37, 70]);
  expect(r.cost).toBe(120);
  expect(r.costPerUnit).toBe(10);
});

test('group product: restricted product discount, zero-qty group, hidden fields skipped', () => {
  const rules: PricingRules = {
    ...base,
    hasGroups: true,
    product: {
      unitPrice: 10, minimumPrice: null,
      discountGroup: { groupRestricted: true, discounts: [] },
    },
    groupFields: [{
      id: 30, originalId: 30, position: 0, fieldType: 2, independent: false,
      isSelectable: true, selectedBy: [888],
      variationCost: 50, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [],
    }],
    fields: [{
      id: 40, originalId: 40, position: 0, fieldType: 2, independent: true,
      isSelectable: true, selectedBy: [888],
      variationCost: 60, variationUnitCost: 0,
      variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
      options: [],
    }],
  };
  const r = estimateQuote(rules, {
    fieldValues: {},
    groups: [{ quantity: 0, fieldValues: {} }],
  }) as QuoteResult;
  // restricted product discount group (empty discounts -> no change); group qty 0;
  // both conditional fields hidden (selectedBy [888] unmet) so not costed
  expect(r.cost).toBe(0);
  expect(r.groupCosts).toEqual([0]);
  expect(r.costPerUnit).toBe(10);
});

test('group field visibility is scoped per group (no cross-group leak)', () => {
  // Size field (24mm=801, 25mm=802) and a premium group field gated by 25mm
  // (selectedBy [802]) whose selected option 811 costs 5 setup.
  const opt = (id: number, selectedBy: number[] = []) => ({
    id, originalId: id, position: id, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy,
  });
  const rules: PricingRules = {
    ...base, hasGroups: true,
    product: { unitPrice: 0, minimumPrice: null, discountGroup: null },
    taxPercent: 0,
    groupFields: [
      {
        id: 800, originalId: 800, position: 0, fieldType: 2, independent: false,
        isSelectable: true, selectedBy: [],
        variationCost: 0, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [opt(801), opt(802)],
      },
      {
        id: 810, originalId: 810, position: 1, fieldType: 2, independent: false,
        isSelectable: true, selectedBy: [802], // gated by 25mm
        variationCost: 0, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [{ ...opt(811), variationCost: 5 }],
      },
    ],
  };
  // Group A picks 24mm but ALSO has premium 811 selected; Group B picks 25mm + 811.
  // Scoped: A's premium field is hidden (24mm) -> 811 NOT costed; B's is visible
  // -> 811 costs 5. A global resolver would wrongly cost A's 811 too (total 10).
  const r = estimateQuote(rules, {
    fieldValues: {},
    groups: [
      { quantity: 10, fieldValues: { 800: { selectedOptionIds: [801] }, 810: { selectedOptionIds: [811] } } },
      { quantity: 10, fieldValues: { 800: { selectedOptionIds: [802] }, 810: { selectedOptionIds: [811] } } },
    ],
  }) as QuoteResult;
  expect(r.groupCosts).toEqual([0, 5]);
  expect(r.cost).toBe(5);
});
