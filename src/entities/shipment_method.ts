import { ShipmentService } from '../constants/shipment_services.js';
import { Entity } from '../entity.js';
import { Address, AddressJson } from './address.js';
import { Company, CompanyJson } from './company.js';
import { CountryTax } from './country_tax.js';
import { Product, ProductJson } from './product.js';
import { ShipmentMethodVariation, ShipmentMethodVariationJson } from './shipment_method_variation.js';

export class ShipmentMethod extends Entity {
  protected static resourceName = 'shipment_methods';
  protected static singularName = 'shipmentMethod';
  protected static pluralName = 'shipmentMethods';

  @ShipmentMethod.property()
  public id?: number;

  @ShipmentMethod.property()
  public name?: string;

  @ShipmentMethod.property({type: ShipmentService})
  public shipmentService?: ShipmentService | null;

  @ShipmentMethod.property({type: Address})
  public originAddress?: Address | null;

  @ShipmentMethod.property()
  public pickUp?: boolean;

  @ShipmentMethod.property({type: Company})
  public company?: Company | null;

  @ShipmentMethod.property()
  public companyDefault?: boolean;

  @ShipmentMethod.property()
  public defaultCost?: number;

  @ShipmentMethod.property()
  public currency?: string;

  @ShipmentMethod.property()
  public buyCost?: number;

  @ShipmentMethod.property()
  public buyCurrency?: string;

  @ShipmentMethod.property({type: Number})
  public transportCompany?: number | null;

  @ShipmentMethod.property()
  public transportCompanyName?: string;

  @ShipmentMethod.property({type: CountryTax})
  public taxType?: CountryTax | null;

  @ShipmentMethod.property({arrayType: 'ShipmentMethodVariation'})
  public variations?: ShipmentMethodVariation[];

  @ShipmentMethod.property({arrayType: 'Product'})
  public products?: Product[];
}


export type ShipmentMethodJson = {
  id: number;
  name: string;
  shipmentService: ShipmentService | null;
  originAddress: AddressJson | null;
  pickUp: boolean;
  company: CompanyJson | null;
  companyDefault: boolean;
  defaultCost: number;
  currency: string;
  buyCost: number;
  buyCurrency: string;
  transportCompany: number | null;
  transportCompanyName: string;
  taxType: CountryTax | null;
  variations: ShipmentMethodVariationJson[];
  products: ProductJson[];
}
