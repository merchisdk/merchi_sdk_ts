import { Entity } from '../entity.js';
import { Company, CompanyJson } from './company.js';
import { Inventory, InventoryJson } from './inventory.js';
import { Job, JobJson } from './job.js';
import { Product, ProductJson } from './product.js';
import { VariationField, VariationFieldJson } from './variation_field.js';

export class InventoryGroup extends Entity {
  protected static resourceName = 'inventory_groups';
  protected static singularName = 'inventoryGroup';
  protected static pluralName = 'inventoryGroups';

  @InventoryGroup.property({type: Date})
  public archived?: Date | null;

  @InventoryGroup.property()
  public id?: number;

  @InventoryGroup.property({type: 'Company'})
  public company?: Company;

  @InventoryGroup.property({arrayType: 'Inventory'})
  public inventories?: Inventory[];

  @InventoryGroup.property()
  public name?: string;

  @InventoryGroup.property({arrayType: 'Product'})
  public products?: Product[];

  @InventoryGroup.property({arrayType: 'Job'})
  public jobs?: Job[];

  @InventoryGroup.property({arrayType: 'VariationField'})
  public variationFields?: VariationField[];
}

// based on above model, generate a JSON version type
export type InventoryGroupJson = {
  id: number;
  archived: string | null;
  company: CompanyJson;
  inventories: InventoryJson[];
  name: string;
  products: ProductJson[];
  jobs: JobJson[];
  variationFields: VariationFieldJson[];
}
