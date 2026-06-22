export interface DiscountTier {
  lowerLimit: number;
  amount: number; // percent
}

export interface DiscountGroup {
  groupRestricted: boolean;
  discounts: DiscountTier[];
}

export interface PricingOption {
  id: number;
  originalId: number | null;
  position: number;
  default: boolean;
  // Per-option stock availability snapshot (only meaningful for
  // inventory-limited products; defaults true otherwise).
  available?: boolean;
  variationCost: number;
  variationUnitCost: number;
  variationCostDiscountGroup: DiscountGroup | null;
  variationUnitCostDiscountGroup: DiscountGroup | null;
  selectedBy: number[];
}

export interface PricingField {
  id: number;
  originalId: number | null;
  position: number;
  fieldType: number;
  independent: boolean;
  isSelectable: boolean;
  selectedBy: number[];
  variationCost: number;
  variationUnitCost: number;
  variationCostDiscountGroup: DiscountGroup | null;
  variationUnitCostDiscountGroup: DiscountGroup | null;
  options: PricingOption[];
}

export interface PricingRules {
  currency: string;
  taxPercent: number;
  product: {
    unitPrice: number;
    minimumPrice: number | null;
    discountGroup: DiscountGroup | null;
  };
  fields: PricingField[];
  groupFields: PricingField[];
  hasGroups: boolean;
  // True when the product is inventory-limited (needs_inventory and not
  // inventories_open): the client disables out-of-stock options from the
  // bundle snapshot and refreshes sufficiency from the server in the background.
  needsInventory?: boolean;
  // Per-combination stock for inventory-limited products: each entry is one
  // inventory record's option-id combination and its quantity. Used for
  // combination-aware option availability.
  inventoryUnits?: InventoryUnit[];
  unsupported?: string;
}

export interface InventoryUnit {
  optionIds: number[];
  quantity: number;
}

export interface FieldSelection {
  selectedOptionIds?: number[];
  value?: string | number | null;
}

export interface GroupSelection {
  quantity: number;
  fieldValues: Record<number, FieldSelection>;
}

export interface Selections {
  quantity?: number;
  fieldValues: Record<number, FieldSelection>;
  groups?: GroupSelection[];
}

export interface QuoteResult {
  costPerUnit: number;
  cost: number;
  taxAmount: number;
  totalCost: number;
  groupCosts: number[];
  currency: string;
}

export interface UnsupportedResult {
  unsupported: string;
}
