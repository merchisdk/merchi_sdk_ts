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
  unsupported?: string;
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
