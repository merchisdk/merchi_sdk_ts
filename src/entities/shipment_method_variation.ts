import { Entity } from '../entity.js';
import { CountryTax } from './country_tax.js';
import { ShipmentMethod, ShipmentMethodJson } from './shipment_method.js';

export class ShipmentMethodVariation extends Entity {
  protected static resourceName = 'shipment_method_variations';
  protected static singularName = 'shipmentMethodVariation';
  protected static pluralName = 'shipmentMethodVariations';

  @ShipmentMethodVariation.property()
  public id?: number;

  @ShipmentMethodVariation.property({type: String})
  public destinationCountry?: string | null;

  @ShipmentMethodVariation.property({type: String})
  public destinationState?: string | null;

  @ShipmentMethodVariation.property({type: Number})
  public cost?: number | null;

  @ShipmentMethodVariation.property()
  public currency?: string;

  @ShipmentMethodVariation.property({type: Number})
  public buyCost?: number | null;

  @ShipmentMethodVariation.property()
  public buyCurrency?: string;

  @ShipmentMethodVariation.property({type: Number})
  public maxWeight?: number | null;

  @ShipmentMethodVariation.property({type: 'CountryTax'})
  public taxType?: CountryTax | null;

  @ShipmentMethodVariation.property()
  public shipmentMethod?: ShipmentMethod;
}

export type ShipmentMethodVariationJson = {
  id: number;
  destinationCountry: string | null;
  destinationState: string | null;
  cost: number | null;
  currency: string;
  buyCost: number | null;
  buyCurrency: string;
  maxWeight: number | null;
  taxType: CountryTax | null;
  shipmentMethod: ShipmentMethodJson;
}
