import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';

export class VariationOption extends Entity {
  protected static singularName = 'variationOption';
  protected static pluralName = 'variationOptions';

  @VariationOption.property()
  public optionId?: number;

  @VariationOption.property({type: String})
  public value?: string | null;

  @VariationOption.property({type: String})
  public colour?: string | null;

  @VariationOption.property()
  public position?: number;

  @VariationOption.property()
  public available?: boolean;

  @VariationOption.property()
  public default?: boolean;

  @VariationOption.property()
  public include?: boolean;

  @VariationOption.property({type: MerchiFile})
  public linkedFile?: MerchiFile | null;

  @VariationOption.property()
  public fieldName?: string;

  @VariationOption.property()
  public quantity?: number;

  @VariationOption.property()
  public currency?: string;

  @VariationOption.property()
  public onceOffCost?: number;

  @VariationOption.property()
  public unitCost?: number;

  @VariationOption.property()
  public unitCostTotal?: number;

  @VariationOption.property()
  public totalCost?: number;
}


// based on above model, generate a JSON version type
export type VariationOptionJson = {
  optionId: number;
  value: string;
  colour: string;
  position: number;
  available: boolean;
  default: boolean;
  include: boolean;
  linkedFile: MerchiFileJson;
  fieldName: string;
  quantity: number;
  currency: string;
  onceOffCost: number;
  unitCost: number;
  unitCostTotal: number;
  totalCost: number;
}
