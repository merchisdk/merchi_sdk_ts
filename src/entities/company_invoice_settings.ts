import { Entity } from '../entity.js';
import { Company } from './company.js';
import { InvoiceTemplate } from './invoice_template.js';
import { CompanyInvoiceSettingsVersion } from './company_invoice_settings_version.js';

export class CompanyInvoiceSettings extends Entity {
  protected static resourceName = 'company-invoice-settings';
  protected static singularName = 'companyInvoiceSettings';
  protected static pluralName = 'companyInvoiceSettingsList';

  @CompanyInvoiceSettings.property()
  public id?: number;

  @CompanyInvoiceSettings.property({type: Company})
  public company?: Company | null;

  @CompanyInvoiceSettings.property({type: InvoiceTemplate})
  public selectedTemplate?: InvoiceTemplate | null;

  @CompanyInvoiceSettings.property()
  public themeOverrides?: any;

  @CompanyInvoiceSettings.property()
  public blockOverrides?: any;

  @CompanyInvoiceSettings.property()
  public customCss?: string;

  @CompanyInvoiceSettings.property()
  public draftThemeOverrides?: any;

  @CompanyInvoiceSettings.property()
  public draftBlockOverrides?: any;

  @CompanyInvoiceSettings.property()
  public draftCustomCss?: string;

  @CompanyInvoiceSettings.property({type: CompanyInvoiceSettingsVersion})
  public publishedVersion?: CompanyInvoiceSettingsVersion | null;

  @CompanyInvoiceSettings.property({arrayType: 'CompanyInvoiceSettingsVersion'})
  public versions?: CompanyInvoiceSettingsVersion[];
}
