import { Company } from './company.js';
import { Entity } from '../entity.js';
import { Invoice } from './invoice.js';
import { Job } from './job.js';
import { Product } from './product.js';
import { Shipment } from './shipment.js';

export class CompanyTag extends Entity {
  protected static resourceName = 'company_tags';
  protected static singularName = 'companyTag';
  protected static pluralName = 'companyTags';

  @CompanyTag.property()
  public id?: number;

  @CompanyTag.property()
  public colour?: number;

  @CompanyTag.property()
  public name?: string;

  @CompanyTag.property()
  public description?: string;

  @CompanyTag.property()
  public showPublic?: boolean;

  @CompanyTag.property()
  public company?: Company;

  @CompanyTag.property({arrayType: 'Job'})
  public jobs?: Job[];

  @CompanyTag.property({arrayType: 'Product'})
  public products?: Product[];

  @CompanyTag.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @CompanyTag.property({arrayType: 'Shipment'})
  public shipments?: Shipment[];
}
