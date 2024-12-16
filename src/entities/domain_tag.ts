import { Domain, DomainJson } from './domain.js';
import { Entity } from '../entity.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { Product, ProductJson } from './product.js';
import { Shipment, ShipmentJson } from './shipment.js';

export class DomainTag extends Entity {
  protected static resourceName = 'domain_tags';
  protected static singularName = 'domainTag';
  protected static pluralName = 'domainTags';

  @DomainTag.property()
  public id?: number;

  @DomainTag.property()
  public colour?: number;

  @DomainTag.property()
  public name?: string;

  @DomainTag.property()
  public description?: string;

  @DomainTag.property()
  public showPublic?: boolean;

  @DomainTag.property()
  public domain?: Domain;

  @DomainTag.property({arrayType: 'Job'})
  public jobs?: Job[];

  @DomainTag.property({arrayType: 'Product'})
  public products?: Product[];

  @DomainTag.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @DomainTag.property({arrayType: 'Shipment'})
  public shipments?: Shipment[];
}

// based on above model, generate a JSON version type
export type DomainTagJson = {
  id: number;
  colour: number;
  name: string;
  description: string;
  showPublic: boolean;
  domain: DomainJson;
  jobs: JobJson[];
  products: ProductJson[];
  invoices: InvoiceJson[];
  shipments: ShipmentJson[];
}
