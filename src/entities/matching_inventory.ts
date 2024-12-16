import { Entity } from '../entity.js';
import { Job, JobJson } from './job.js';
import { Inventory, InventoryJson } from './inventory.js';
import { VariationsGroup, VariationsGroupJson } from './variations_group.js';
import { InventoryStatus } from '../constants/inventory_statuses.js';

export class MatchingInventory extends Entity {
  protected static resourceName = 'matching_inventories';
  protected static singularName = 'matchingInventory';
  protected static pluralName = 'matchingInventories';

  @MatchingInventory.property({type: Date})
  public archived?: Date | null;

  @MatchingInventory.property({type: Date})
  public deductionDate?: Date | null;

  @MatchingInventory.property()
  public job?: Job;

  @MatchingInventory.property({type: 'VariationsGroup'})
  public group?: VariationsGroup | null;

  @MatchingInventory.property({type: Inventory})
  public inventory?: Inventory | null;

  @MatchingInventory.property()
  public status?: InventoryStatus;
}


// based on above model, generate a JSON version type
export type MatchingInventoryJson = {
  id: number;
  archived: string | null;
  deductionDate: string | null;
  status: InventoryStatus;
  job: JobJson;
  group: VariationsGroupJson | null;
  inventory: InventoryJson | null;
}
