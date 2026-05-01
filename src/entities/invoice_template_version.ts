import { Entity } from '../entity.js';
import { InvoiceTemplate } from './invoice_template.js';

export class InvoiceTemplateVersion extends Entity {
  protected static resourceName = 'invoice-template-versions';
  protected static singularName = 'invoiceTemplateVersion';
  protected static pluralName = 'invoiceTemplateVersions';

  @InvoiceTemplateVersion.property()
  public id?: number;

  @InvoiceTemplateVersion.property({type: 'InvoiceTemplate'})
  public template?: InvoiceTemplate | null;

  @InvoiceTemplateVersion.property({type: Object})
  public blocksJson?: any;

  @InvoiceTemplateVersion.property({type: Date})
  public creationDate?: Date | null;
}
