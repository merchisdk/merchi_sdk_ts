import { Entity } from '../entity.js';
import { Assignment, AssignmentJson } from './assignment.js';
import { Job, JobJson } from './job.js';

export class ShipmentItemFulfillment extends Entity {
  protected static resourceName = 'shipment_item_fulfillments';
  protected static singularName = 'shipmentItemFulfillment';
  protected static pluralName = 'shipmentItemFulfillments';

  @ShipmentItemFulfillment.property({type: 'Assignment'})
  public assignment?: Assignment;

  @ShipmentItemFulfillment.property({type: 'Job'})
  public job?: Job;
}

// based on above model, generate a JSON version type
export type ShipmentItemFulfillmentJson = {
  assignment: AssignmentJson;
  job: JobJson;
}
