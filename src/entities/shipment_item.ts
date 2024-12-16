import { Entity } from '../entity.js';
import { Job, JobJson } from './job.js';
import {
  ShipmentItemFulfillment,
  ShipmentItemFulfillmentJson
} from './shipment_item_fulfillment.js';

export class ShipmentItem extends Entity {
  protected static resourceName = 'shipment_items';
  protected static singularName = 'shipmentItem';
  protected static pluralName = 'shipmentItems';

  @ShipmentItem.property({type: Job})
  public job?: Job;

  @ShipmentItem.property({arrayType: 'ShipmentItemFulfillment'})
  public fulfillments?: ShipmentItemFulfillment[];
}

// based on above model, generate a JSON version type
export type ShipmentItemJson = {
  job: JobJson;
  fulfillments: ShipmentItemFulfillmentJson[];
}
