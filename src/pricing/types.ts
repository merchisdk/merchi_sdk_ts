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
  /** Area field (type 14): once-off and per-edge unit costs. */
  areaUnit?: 'mm' | 'cm' | 'm' | string;
  heightVariationCost?: number;
  heightVariationUnitCost?: number;
  widthVariationCost?: number;
  widthVariationUnitCost?: number;
  heightVariationCostDiscountGroup?: DiscountGroup | null;
  heightVariationUnitCostDiscountGroup?: DiscountGroup | null;
  widthVariationCostDiscountGroup?: DiscountGroup | null;
  widthVariationUnitCostDiscountGroup?: DiscountGroup | null;
  options: PricingOption[];
}

export interface PricingRules {
  currency: string;
  taxPercent: number;
  product: {
    unitPrice: number;
    minimumPrice: number | null;
    /** Product-level setup fee. Applied once to the job, or once per
     * non-empty variation group when setupPerGroup is true. */
    setupPrice?: number;
    setupPerGroup?: boolean;
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

export interface PriceMatrixBand {
  /** Inclusive lower quantity used to quote this column. */
  quantity: number;
  /** Inclusive upper quantity, or null for an open-ended last band. */
  upperLimit: number | null;
  /** Buyer-facing range, e.g. "1–49" or "100+". */
  label: string;
}

export interface PriceMatrixCell {
  quantity: number;
  costPerUnit: number;
  /** Ex-tax cost ÷ quantity (variation unit costs + amortized setup). */
  unitPrice: number;
  cost: number;
  taxAmount: number;
  totalCost: number;
}

export interface PriceMatrix {
  currency: string;
  taxPercent: number;
  bands: PriceMatrixBand[];
  cells: PriceMatrixCell[];
}

export interface BuildPriceMatrixOptions {
  /** Floor quantity for the first band (product MOQ). Defaults to 1. */
  minQuantity?: number;
}
