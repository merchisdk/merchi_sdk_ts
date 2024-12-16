import { Company, CompanyJson } from './company.js';
import { Domain, DomainJson } from './domain.js';
import { Entity } from '../entity.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { Product, ProductJson } from './product.js';
import { Shipment, ShipmentJson } from './shipment.js';
import { Theme, ThemeJson } from './theme.js';
import { User, UserJson } from './user.js';

export class InternalTag extends Entity {
  protected static resourceName = 'internal_tags';
  protected static singularName = 'internalTag';
  protected static pluralName = 'internalTags';

  @InternalTag.property()
  public id?: number;

  @InternalTag.property()
  public colour?: number;

  @InternalTag.property()
  public name?: string;

  @InternalTag.property()
  public description?: string;

  @InternalTag.property({arrayType: 'Company'})
  public companies?: Company[];

  @InternalTag.property({arrayType: 'Domain'})
  public domains?: Domain[];

  @InternalTag.property({arrayType: 'Job'})
  public jobs?: Job[];

  @InternalTag.property({arrayType: 'Product'})
  public products?: Product[];

  @InternalTag.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @InternalTag.property({arrayType: 'Shipment'})
  public shipments?: Shipment[];

  @InternalTag.property({arrayType: 'Theme'})
  public themes?: Theme[];

  @InternalTag.property({arrayType: 'User'})
  public users?: User[];
}

// based on above model, generate a JSON version type
export type InternalTagJson = {
  id: number;
  colour: number;
  name: string;
  description: string;
  companies: CompanyJson[];
  domains: DomainJson[];
  jobs: JobJson[];
  products: ProductJson[];
  invoices: InvoiceJson[];
  shipments: ShipmentJson[];
  themes: ThemeJson[];
  users: UserJson[];
}
