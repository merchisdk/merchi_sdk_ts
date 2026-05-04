import { Entity } from '../entity.js';
import type { Shipment } from './shipment.js';
import { User } from './user.js';

export class ShipmentLog extends Entity {
  protected static resourceName = 'shipment_logs';
  protected static singularName = 'shipmentLog';
  protected static pluralName = 'shipmentLogs';

  @ShipmentLog.property()
  public id?: number;

  @ShipmentLog.property({ type: 'Shipment' })
  public shipment?: Shipment | null;

  @ShipmentLog.property({ type: User })
  public user?: User | null;

  @ShipmentLog.property({ type: String })
  public sourceType?: string;

  @ShipmentLog.property({ type: String })
  public message?: string;

  @ShipmentLog.property()
  public detailJson?: Record<string, unknown> | null;

  @ShipmentLog.property({ type: Date })
  public createdAt?: Date | null;
}
