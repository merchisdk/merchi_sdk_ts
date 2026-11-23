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

interface Resolver {
  allFields: PricingField[];
  fieldsToConsider: PricingField[];
  isFulfilled: (selectedBy: number[], checked: number[]) => boolean;
}

// Shared machinery for both field- and option-level conditional visibility.
// Mirrors the server's `check_selected_by_fullfilled` recursion: a `selectedBy`
// list is fulfilled when any of its trigger option ids is currently selected
// AND that selecting option is itself fulfilled (its own `selectedBy` and its
// owning field's `selectedBy`), with a `checked` accumulator to break cycles.
function buildResolver(rules: PricingRules, selections: Selections): Resolver {
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

  // Group variation fields only materialise as variations when the job
  // actually has groups (the server builds them inside each `variations_group`
  // via `VariationsGroups.mapper_variations`; with no groups there are no group
  // variations at all). Independent fields are always in play. This mirrors the
  // server, where a non-group job exposes no group fields.
  const hasGroups = Boolean(selections.groups && selections.groups.length > 0);
  const fieldsToConsider = hasGroups ? allFields : rules.fields;

  return { allFields, fieldsToConsider, isFulfilled };
}

export function resolveVisibleFields(
  rules: PricingRules,
  selections: Selections
): Set<number> {
  const { fieldsToConsider, isFulfilled } = buildResolver(rules, selections);
  const visible = new Set<number>();
  for (const f of fieldsToConsider) {
    if (isFulfilled(f.selectedBy, [])) visible.add(f.id);
  }
  return visible;
}

// Returns the set of option ids whose own `selectedBy` is fulfilled — i.e. the
// options that should be visible/selectable given the current selections.
// Mirrors the server's per-option `isVisible = check_selected_by_fullfilled(
// option.selected_by)`. Options with no `selectedBy` are always visible.
export function resolveVisibleOptionIds(
  rules: PricingRules,
  selections: Selections
): Set<number> {
  const { fieldsToConsider, isFulfilled } = buildResolver(rules, selections);
  const visible = new Set<number>();
  for (const f of fieldsToConsider) {
    for (const o of f.options) {
      if (isFulfilled(o.selectedBy, [])) visible.add(o.id);
    }
  }
  return visible;
}
