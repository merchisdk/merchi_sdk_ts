import * as fs from 'fs';
import * as path from 'path';
import { estimateQuote } from './estimate.js';
import { resolveVisibleFields } from './visibility.js';
import { PricingRules, Selections, QuoteResult } from './types.js';

const FIXTURES_DIR = path.resolve(__dirname, '../../../pricing-fixtures');

interface Fixture {
  name: string;
  bundle: PricingRules;
  selections: Selections;
  expected: {
    cost: number; costPerUnit: number; taxAmount: number; totalCost: number;
    groupCosts: number[]; visibleFieldIds: number[];
  };
}

function loadFixtures(): Fixture[] {
  if (!fs.existsSync(FIXTURES_DIR)) return [];
  return fs.readdirSync(FIXTURES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, f), 'utf-8')));
}

const fixtures = loadFixtures();

test('pricing fixtures exist', () => {
  expect(fixtures.length).toBeGreaterThan(0);
});

describe.each(fixtures)('golden parity: $name', (fixture: Fixture) => {
  test('estimateQuote matches server', () => {
    const result = estimateQuote(fixture.bundle, fixture.selections) as QuoteResult;
    expect(result.cost).toBeCloseTo(fixture.expected.cost, 2);
    expect(result.costPerUnit).toBeCloseTo(fixture.expected.costPerUnit, 3);
    expect(result.taxAmount).toBeCloseTo(fixture.expected.taxAmount, 2);
    expect(result.totalCost).toBeCloseTo(fixture.expected.totalCost, 2);
    expect(result.groupCosts.length).toBe(fixture.expected.groupCosts.length);
    result.groupCosts.forEach((c, i) =>
      expect(c).toBeCloseTo(fixture.expected.groupCosts[i], 2));
  });

  test('resolveVisibleFields matches server', () => {
    const visible = [...resolveVisibleFields(fixture.bundle, fixture.selections)].sort((a, b) => a - b);
    expect(visible).toEqual(fixture.expected.visibleFieldIds);
  });
});
