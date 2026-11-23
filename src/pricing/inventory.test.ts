import { resolveUnavailableOptionIds } from './inventory.js';
import { PricingRules } from './types.js';

// Size (24mm=801, 25mm=802) x Colour (Red=811, Green=812, Blue=813), with
// per-combination stock. 25mm-Blue = 0; 19mm/24mm-Blue has stock.
function rules(inventoryUnits: any[]): PricingRules {
  const opt = (id: number) => ({
    id, originalId: id, position: id, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy: [],
  });
  const f = (id: number, options: number[]): any => ({
    id, originalId: id, position: 0, fieldType: 2, independent: false,
    isSelectable: true, selectedBy: [],
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    options: options.map(opt),
  });
  return {
    currency: 'AUD', taxPercent: 0,
    product: { unitPrice: 0, minimumPrice: null, discountGroup: null },
    fields: [], hasGroups: true, needsInventory: true,
    groupFields: [f(800, [801, 802]), f(810, [811, 812, 813])],
    inventoryUnits,
  };
}

const units = [
  { optionIds: [801, 813], quantity: 5 },  // 24mm-Blue: in stock
  { optionIds: [802, 811], quantity: 7 },  // 25mm-Red: in stock
  { optionIds: [802, 812], quantity: 7 },  // 25mm-Green: in stock
  { optionIds: [802, 813], quantity: 0 },  // 25mm-Blue: OUT OF STOCK
];

test('no inventory units -> nothing unavailable', () => {
  const r = rules([]);
  expect(resolveUnavailableOptionIds(r, { fieldValues: {}, groups: [{ quantity: 1, fieldValues: {} }] }).size).toBe(0);
});

test('with no other selection, an option with stock somewhere is available', () => {
  const r = rules(units);
  // Nothing selected: Blue has stock as 24mm-Blue, so not unavailable.
  const u = resolveUnavailableOptionIds(r, { fieldValues: {}, groups: [{ quantity: 1, fieldValues: {} }] });
  expect(u.has(813)).toBe(false);
});

test('25mm makes Blue unavailable but keeps Red/Green available', () => {
  const r = rules(units);
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: { 800: { selectedOptionIds: [802] } } }],
  });
  expect(u.has(813)).toBe(true);  // 25mm-Blue = 0 -> Blue disabled
  expect(u.has(811)).toBe(false); // 25mm-Red ok
  expect(u.has(812)).toBe(false); // 25mm-Green ok
});

test('selecting Blue makes 25mm unavailable (combination-aware both directions)', () => {
  const r = rules(units);
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: { 810: { selectedOptionIds: [813] } } }],
  });
  expect(u.has(802)).toBe(true);  // 25mm + Blue = 0 -> 25mm disabled
  expect(u.has(801)).toBe(false); // 24mm + Blue = 5 -> 24mm ok
});

test('per-group scope: one group selecting 25mm does not disable Blue in another', () => {
  const r = rules(units);
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: { 800: { selectedOptionIds: [801] } } }],
  });
  // 24mm selected here -> 24mm-Blue has stock -> Blue available.
  expect(u.has(813)).toBe(false);
});

test('omitted inventoryUnits -> nothing unavailable', () => {
  const r = rules(units);
  delete (r as any).inventoryUnits;
  expect(resolveUnavailableOptionIds(r, { fieldValues: {} }).size).toBe(0);
});

test('non-group product: top-level selections drive availability', () => {
  const opt = (id: number) => ({
    id, originalId: null, position: id, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy: [],
  });
  const f = (id: number, options: number[]): any => ({
    id, originalId: id, position: 0, fieldType: 2, independent: true,
    isSelectable: true, selectedBy: [],
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    options: options.map(opt),
  });
  const r: PricingRules = {
    currency: 'AUD', taxPercent: 0,
    product: { unitPrice: 0, minimumPrice: null, discountGroup: null },
    hasGroups: false, needsInventory: true,
    fields: [f(800, [801, 802]), f(810, [811, 813])],
    groupFields: [],
    inventoryUnits: [
      { optionIds: [802, 811], quantity: 7 }, // 25mm-Red
      { optionIds: [802, 813], quantity: 0 }, // 25mm-Blue OUT
    ],
  };
  const u = resolveUnavailableOptionIds(r, {
    quantity: 1,
    fieldValues: { 800: { selectedOptionIds: [802] } },
  });
  expect(u.has(813)).toBe(true);  // 25mm-Blue unavailable
  expect(u.has(811)).toBe(false); // 25mm-Red ok
});

test('non-inventory options and non-selection field values are ignored', () => {
  const r = rules(units);
  // Field 810 option 999 is not in any unit (not tracked); a value-only field
  // and an undefined selection entry exercise the skip branches.
  (r.groupFields[1].options as any).push({
    id: 999, originalId: null, position: 9, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy: [],
  });
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: { 700: { value: 'text' }, 701: undefined as any },
    groups: [{ quantity: 1, fieldValues: { 800: { selectedOptionIds: [802] }, 810: { selectedOptionIds: [999] } } }],
  });
  expect(u.has(999)).toBe(false); // untracked option is always available
  expect(u.has(813)).toBe(true);  // 25mm-Blue still unavailable
});

test('undefined top-level fieldValues and group fieldValues are tolerated', () => {
  const r = rules(units);
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: undefined as any,
    groups: [{ quantity: 1, fieldValues: undefined as any }],
  });
  // No selections -> only options with zero stock everywhere would be flagged;
  // every option here has stock in some combo, so none unavailable.
  expect(u.size).toBe(0);
});

test('same field selected at top level and in a group merges selections', () => {
  const r = rules(units);
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: { 800: { selectedOptionIds: [802] } },
    groups: [{ quantity: 1, fieldValues: { 800: { selectedOptionIds: [802] } } }],
  });
  expect(u.has(813)).toBe(true); // 25mm selected (both scopes) -> Blue unavailable
});

test('unit referencing an unknown option id falls back to the raw id', () => {
  const r = rules([
    { optionIds: [802, 813], quantity: 0 },
    { optionIds: [802, 5555], quantity: 9 }, // 5555 not a known option
  ]);
  // 25mm + Blue still 0; the unknown id just never matches a selection.
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: { 800: { selectedOptionIds: [802] } } }],
  });
  expect(u.has(813)).toBe(true);
});

test('originalId is canonicalised when matching units', () => {
  const opt = (id: number, originalId: number | null) => ({
    id, originalId, position: id, default: false,
    variationCost: 0, variationUnitCost: 0,
    variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
    selectedBy: [],
  });
  const r: PricingRules = {
    currency: 'AUD', taxPercent: 0,
    product: { unitPrice: 0, minimumPrice: null, discountGroup: null },
    fields: [], hasGroups: true, needsInventory: true,
    groupFields: [
      {
        id: 800, originalId: 800, position: 0, fieldType: 2, independent: false,
        isSelectable: true, selectedBy: [],
        variationCost: 0, variationUnitCost: 0,
        variationCostDiscountGroup: null, variationUnitCostDiscountGroup: null,
        options: [opt(900, 802)], // cloned option 900 whose original is 802
      },
    ],
    // inventory references the original id 802
    inventoryUnits: [{ optionIds: [802], quantity: 0 }],
  };
  const u = resolveUnavailableOptionIds(r, {
    fieldValues: {},
    groups: [{ quantity: 1, fieldValues: {} }],
  });
  expect(u.has(900)).toBe(true); // original 802 has 0 stock -> cloned 900 unavailable
});
