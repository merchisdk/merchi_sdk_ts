import { CartItem, CartItemJson } from './cart_item.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { Job, JobJson } from './job.js';
import { VariationField, VariationFieldJson } from './variation_field.js';
import { VariationOption, VariationOptionJson } from './variation_option.js';
import { VariationsGroup, VariationsGroupJson } from './variations_group.js';

export class Variation extends Entity {
  protected static resourceName = 'variations';
  protected static singularName = 'variation';
  protected static pluralName = 'variations';

  @Variation.property({type: Date})
  public archived?: Date | null;

  @Variation.property()
  public id?: number;

  @Variation.property({type: String})
  public value?: string | null;

  @Variation.property()
  public currency?: string;

  @Variation.property()
  public cost?: number;

  @Variation.property()
  public quantity?: number;

  @Variation.property()
  public onceOffCost?: number;

  @Variation.property()
  public unitCost?: number;

  @Variation.property()
  public unitCostTotal?: number;

  @Variation.property()
  public variationField?: VariationField;

  @Variation.property({type: VariationsGroup})
  public variationsGroup?: VariationsGroup | null;

  @Variation.property({type: Job})
  public job?: Job | null;

  @Variation.property({type: CartItem})
  public cartItem?: CartItem | null;

  @Variation.property({arrayType: 'MerchiFile'})
  public variationFiles?: MerchiFile[];

  @Variation.property({arrayType: 'VariationOption'})
  public selectedOptions?: VariationOption[];

  @Variation.property({arrayType: 'VariationOption'})
  public selectableOptions?: VariationOption[];
}


// based on above model, generate a JSON version type
export type VariationJson = {
  id: number;
  archived: string | null;
  value: string | null;
  currency: string;
  cost: number;
  quantity: number;
  onceOffCost: number;
  unitCost: number;
  unitCostTotal: number;
  variationField: VariationFieldJson;
  variationsGroup: VariationsGroupJson | null;
  job: JobJson | null;
  cartItem: CartItemJson | null;
  variationFiles: MerchiFileJson[];
  selectedOptions: VariationOptionJson[];
  selectableOptions: VariationOptionJson[];
}
