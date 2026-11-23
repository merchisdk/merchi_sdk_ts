import { PricingRules, PricingField, Selections } from './types.js';

// Returns the set of option ids that should be DISABLED because the combination
// of (current inventory-relevant selections + that option) has no matching
// inventory with stock. Mirrors the server's subset match
// (inventories.py `inventories_subset_match_strategy`): an inventory matches a
// selection when it contains every selected option; an option is available if
// any matching inventory has quantity > 0.
//
// Scope: pass the container's selections (independent fields use the top-level
// selections; a group uses its own + independent). Only options that appear in
// at least one inventory unit are inventory-tracked; all others are always
// available. Direct product inventories only (no shared inventory groups).
export function resolveUnavailableOptionIds(
  rules: PricingRules,
  selections: Selections
): Set<number> {
  const unavailable = new Set<number>();
  const units = rules.inventoryUnits || [];
  if (units.length === 0) return unavailable;

  const allFields: PricingField[] = [...rules.fields, ...rules.groupFields];

  // Canonicalise id/originalId to a single id per option so bundle option ids,
  // selected ids and inventory unit ids all compare consistently.
  const canonical = new Map<number, number>();
  const fieldIdByOption = new Map<number, number>();
  for (const f of allFields) {
    for (const o of f.options) {
      canonical.set(o.id, o.id);
      fieldIdByOption.set(o.id, f.id);
      if (o.originalId != null) {
        canonical.set(o.originalId, o.id);
        fieldIdByOption.set(o.originalId, f.id);
      }
    }
  }
  const canon = (id: number): number => (canonical.has(id) ? (canonical.get(id) as number) : id);

  const unitSets = units.map((u) => ({
    quantity: u.quantity,
    optionIds: new Set(u.optionIds.map(canon)),
  }));
  const inventoryOptionIds = new Set<number>();
  for (const u of unitSets) {
    for (const id of u.optionIds) inventoryOptionIds.add(id);
  }

  // Collect currently-selected, inventory-tracked option ids grouped by field.
  const selectedByField = new Map<number, Set<number>>();
  const addSelections = (
    fieldValues: Record<number, { selectedOptionIds?: number[] }>
  ) => {
    for (const key of Object.keys(fieldValues)) {
      const fieldId = Number(key);
      const sel = fieldValues[fieldId];
      if (!sel || !sel.selectedOptionIds) continue;
      const set = selectedByField.get(fieldId) || new Set<number>();
      for (const oid of sel.selectedOptionIds) {
        const c = canon(oid);
        if (inventoryOptionIds.has(c)) set.add(c);
      }
      selectedByField.set(fieldId, set);
    }
  };
  addSelections(selections.fieldValues || {});
  for (const group of selections.groups || []) addSelections(group.fieldValues || {});

  const hasGroups = Boolean(selections.groups && selections.groups.length > 0);
  const fieldsToConsider = hasGroups ? allFields : rules.fields;

  for (const f of fieldsToConsider) {
    for (const o of f.options) {
      const candidate = canon(o.id);
      if (!inventoryOptionIds.has(candidate)) continue; // not inventory-tracked
      // filter = candidate + selected inventory options from OTHER fields.
      const filter: number[] = [candidate];
      for (const [fieldId, set] of selectedByField) {
        if (fieldId === f.id) continue;
        for (const sid of set) filter.push(sid);
      }
      const available = unitSets.some(
        (u) => u.quantity > 0 && filter.every((id) => u.optionIds.has(id))
      );
      if (!available) unavailable.add(o.id);
    }
  }
  return unavailable;
}
