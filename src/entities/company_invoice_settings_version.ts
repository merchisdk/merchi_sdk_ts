import { Entity } from '../entity.js';
import { CompanyInvoiceSettings } from './company_invoice_settings.js';
import { InvoiceTemplate } from './invoice_template.js';

export class CompanyInvoiceSettingsVersion extends Entity {
  protected static resourceName = 'company-invoice-settings-versions';
  protected static singularName = 'companyInvoiceSettingsVersion';
  protected static pluralName = 'companyInvoiceSettingsVersions';

  @CompanyInvoiceSettingsVersion.property()
  public id?: number;

  @CompanyInvoiceSettingsVersion.property({type: 'CompanyInvoiceSettings'})
  public settings?: CompanyInvoiceSettings | null;

  @CompanyInvoiceSettingsVersion.property({type: 'InvoiceTemplate'})
  public template?: InvoiceTemplate | null;

  @CompanyInvoiceSettingsVersion.property({type: Object})
  public themeOverrides?: any;

  @CompanyInvoiceSettingsVersion.property({type: Object})
  public blockOverrides?: any;

  @CompanyInvoiceSettingsVersion.property()
  public customCss?: string;

  @CompanyInvoiceSettingsVersion.property({type: Date})
  public creationDate?: Date | null;
}
