import { Entity } from '../entity.js';
import { Inventory } from './Inventory.js';
import { Job } from './job.js';
import { Product } from './product.js';
import { VariationField } from './variation_field.js';

export class InventoryGroup extends Entity {
  protected static resourceName = 'inventory_groups';
  protected static singularName = 'inventoryGroup';
  protected static pluralName = 'inventoryGroups';

  @InventoryGroup.property({type: Date})
  public archived?: Date | null;

  @InventoryGroup.property()
  public id?: number;

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
