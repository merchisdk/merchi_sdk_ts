import {
  DiscountGroup,
  DiscountGroupJson
} from './discount_group.js';
import {
  Entity
} from '../entity.js';
import {
  MerchiFile,
  MerchiFileJson
} from './file.js';
import {
  InventoryUnitVariation,
  InventoryUnitVariationJson
} from './inventory_unit_variation.js';
import {
  Variation,
  VariationJson
} from './variation.js';
import {
  VariationField,
  VariationFieldJson
} from './variation_field.js';

export class VariationFieldsOption extends Entity {
  protected static resourceName = 'variation_fields_options';
  protected static singularName = 'variationFieldsOption';
  protected static pluralName = 'variationFieldsOptions';

  @VariationFieldsOption.property({type: Date})
  public archived?: Date | null;

  @VariationFieldsOption.property()
  public id?: number;

  @VariationFieldsOption.property({type: String})
  public value?: string | null;

  @VariationFieldsOption.property({type: String})
  public colour?: string | null;

  @VariationFieldsOption.property()
  public currency?: string;

  @VariationFieldsOption.property()
  public default?: boolean;

  @VariationFieldsOption.property()
  public include?: boolean;

  @VariationFieldsOption.property()
  public noInventory?: boolean;

  @VariationFieldsOption.property()
  public position?: number;

  @VariationFieldsOption.property()
  public variationCost?: number;

  @VariationFieldsOption.property({type: 'DiscountGroup'})
  public variationCostDiscountGroup?: DiscountGroup | null;

  @VariationFieldsOption.property()
  public variationUnitCost?: number;

  @VariationFieldsOption.property({embeddedByDefault: false})
  public buyUnitCost?: number;

  @VariationFieldsOption.property({embeddedByDefault: false})
  public buyCost?: number;

  @VariationFieldsOption.property({type: 'DiscountGroup'})
  public variationUnitCostDiscountGroup?: DiscountGroup | null;

  @VariationFieldsOption.property({type: VariationField})
  public variationField?: VariationField | null;

  @VariationFieldsOption.property({type: MerchiFile})
  public linkedFile?: MerchiFile | null;

  @VariationFieldsOption.property({arrayType: 'Variation'})
  public selectedByVariations?: Variation[];

  @VariationFieldsOption.property({arrayType: 'InventoryUnitVariation'})
  public inventoryUnitVariations?: InventoryUnitVariation[];

  public totalCost = (quantity: number) => {
    if (this.variationCost === undefined) {
      throw new Error('variationCost is unknown');
    }
    if (this.variationUnitCost === undefined) {
      throw new Error('variationUnitCost is unknown');
    }
    return this.variationCost + this.variationUnitCost * quantity;
  };

  public buildVariationOption = () => {
    const result = new this.merchi.VariationOption(this.merchi);
    result.optionId = this.id;
    result.include = this.include;
    result.value = this.value;
    result.position = this.position;
    result.default = this.default;
    result.colour = this.colour;
    result.linkedFile = this.linkedFile;
    result.quantity = 0;

    result.currency = this.currency;
    result.unitCost = this.variationUnitCost;
    result.unitCostTotal = 0;
    result.onceOffCost = this.variationCost;
    result.totalCost = this.variationCost;
    return result;
  };
}


// based on above model, generate a JSON version type
export type VariationFieldsOptionJson = {
  id: number;
  archived: string | null;
  value: string | null;
  colour: string | null;
  currency: string;
  default: boolean;
  include: boolean;
  noInventory: boolean;
  position: number;
  variationCost: number;
  variationCostDiscountGroup: DiscountGroupJson | null;
  variationUnitCost: number;
  buyUnitCost: number;
  buyCost: number;
  variationUnitCostDiscountGroup: DiscountGroupJson | null;
  variationField: VariationFieldJson | null;
  linkedFile: MerchiFileJson | null;
  selectedByVariations: VariationJson[];
  inventoryUnitVariations: InventoryUnitVariationJson[];
}
