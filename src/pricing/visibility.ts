import { PricingRules, PricingField, PricingOption, Selections } from './types.js';

function collectSelectedOptionIds(selections: Selections): number[] {
  const ids: number[] = [];
  const addFrom = (fieldValues: Record<number, { selectedOptionIds?: number[] }>) => {
    for (const key of Object.keys(fieldValues)) {
      const sel = fieldValues[Number(key)];
      if (sel && sel.selectedOptionIds) ids.push(...sel.selectedOptionIds);
    }
  };
  addFrom(selections.fieldValues || {});
  for (const group of selections.groups || []) addFrom(group.fieldValues || {});
  return ids;
}

export function resolveVisibleFields(
  rules: PricingRules,
  selections: Selections
): Set<number> {
  const allFields: PricingField[] = [...rules.fields, ...rules.groupFields];
  const optionsById = new Map<number, PricingOption>();
  const fieldByOptionId = new Map<number, PricingField>();
  for (const f of allFields) {
    for (const o of f.options) {
      optionsById.set(o.id, o);
      fieldByOptionId.set(o.id, f);
      if (o.originalId != null) {
        optionsById.set(o.originalId, o);
        fieldByOptionId.set(o.originalId, f);
      }
    }
  }

  const selectedOptionIds = collectSelectedOptionIds(selections);

  const sameOption = (a: number, b: number): boolean => {
    const oa = optionsById.get(a);
    return oa != null && oa === optionsById.get(b);
  };

  const isFulfilled = (selectedBy: number[], checked: number[]): boolean => {
    if (!selectedBy || selectedBy.length === 0) return true;
    for (const triggerId of selectedBy) {
      for (const selId of selectedOptionIds) {
        if (!sameOption(triggerId, selId)) continue;
        if (checked.includes(selId)) return true;
        // sameOption only returns true for ids present in optionsById, and
        // fieldByOptionId is populated in the same loop, so both lookups are
        // guaranteed non-null here (mirrors server dereferencing directly).
        const opt = optionsById.get(selId) as PricingOption;
        const field = fieldByOptionId.get(selId) as PricingField;
        const nextChecked = [...checked, selId];
        if (
          isFulfilled(opt.selectedBy, nextChecked) &&
          isFulfilled(field.selectedBy, nextChecked)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const visible = new Set<number>();
  for (const f of allFields) {
    if (isFulfilled(f.selectedBy, [])) visible.add(f.id);
  }
  return visible;
}
