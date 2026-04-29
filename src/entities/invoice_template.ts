import { Entity } from '../entity.js';
import { InvoiceTemplateVersion } from './invoice_template_version.js';

export class InvoiceTemplate extends Entity {
  protected static resourceName = 'invoice-templates';
  protected static singularName = 'invoiceTemplate';
  protected static pluralName = 'invoiceTemplates';

  @InvoiceTemplate.property()
  public id?: number;

  @InvoiceTemplate.property()
  public slug?: string;

  @InvoiceTemplate.property()
  public name?: string;

  @InvoiceTemplate.property()
  public baseCss?: string;

  @InvoiceTemplate.property({type: InvoiceTemplateVersion})
  public activeVersion?: InvoiceTemplateVersion | null;

  @InvoiceTemplate.property({arrayType: 'InvoiceTemplateVersion'})
  public versions?: InvoiceTemplateVersion[];
}
