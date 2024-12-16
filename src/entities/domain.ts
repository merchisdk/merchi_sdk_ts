import { Cart, CartJson } from './cart.js';
import { Category, CategoryJson } from './category.js';
import { Company, CompanyJson } from './company.js';
import { DomainInvitation, DomainInvitationJson } from './domain_invitation.js';
import { DomainTag, DomainTagJson } from './domain_tag.js';
import { EnrolledDomain, EnrolledDomainJson } from './enrolled_domain.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { InternalTag, InternalTagJson } from './internal_tag.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { Menu, MenuJson } from './menu.js';
import { User } from './user.js';
import { Notification, NotificationJson } from './notification.js';
import { Product, ProductJson } from './product.js';
import { Session, SessionJson } from './session.js';
import { SupplyDomain, SupplyDomainJson } from './supply_domain.js';
import { SeoDomainPage, SeoDomainPageJson } from './seo_domain_page.js';
import { Theme, ThemeJson } from './theme.js';
import { DomainType } from '../constants/domain_types.js';

export class Domain extends Entity {
  protected static resourceName = 'domains';
  protected static singularName = 'domain';
  protected static pluralName = 'domains';

  @Domain.property({type: Date})
  public archived?: Date | null;

  @Domain.property()
  public id?: number;

  @Domain.property()
  public domain?: string;

  @Domain.property()
  public country?: string;

  @Domain.property()
  public currency?: string;

  @Domain.property()
  public callToActions?: string;

  @Domain.property()
  public callToActionDetails?: any[];

  @Domain.property()
  public isMaster?: boolean;

  @Domain.property()
  public deploymentOnline?: boolean;

  @Domain.property()
  public deploymentInProgress?: boolean;

  @Domain.property()
  public deploymentSucceeded?: boolean;

  @Domain.property()
  public deploymentMessage?: string;

  @Domain.property()
  public deploymentKey?: string;

  @Domain.property()
  public internalUseNotes?: string;

  @Domain.property()
  public internalUseAiContext?: string;

  @Domain.property()
  public aiContext?: string;

  @Domain.property()
  public domainType?: DomainType;

  @Domain.property()
  public subDomain?: string;

  @Domain.property()
  public emailDomain?: string;

  @Domain.property()
  public smsName?: string;

  @Domain.property()
  public showDomainPublicly?: boolean;

  @Domain.property()
  public publicAccessRestricted?: boolean;

  @Domain.property()
  public showDomainToAccessibleEntitiesOnly?: boolean;

  @Domain.property()
  public enableEmailNotifications?: boolean;

  @Domain.property()
  public enableSmsNotifications?: boolean;

  @Domain.property()
  public mailgunRecords?: any[];

  @Domain.property()
  public enableNotifications?: boolean;

  @Domain.property({type: String})
  public trackingCodeGoogleConversion?: string | null;

  @Domain.property({type: String})
  public trackingCodeGoogleGlobal?: string | null;

  @Domain.property({type: String})
  public apiSecret?: string | null;

  @Domain.property({type: String})
  public webflowApiKey?: string | null;

  @Domain.property({type: String})
  public shopifyShopUrl?: string | null;

  @Domain.property()
  public shopifyIsActive?: boolean;

  @Domain.property({type: String})
  public qrShopQrCode?: string | null;

  @Domain.property({type: String})
  public unltdAiApiOrganizationId?: string;

  @Domain.property({type: String})
  public unltdAiApiSecretKey?: string;

  @Domain.property({type: String})
  public scalablePressApiKey?: string;

  @Domain.property({type: String})
  public socialBitchute?: string | null;

  @Domain.property({type: String})
  public socialDiscord?: string | null;

  @Domain.property({type: String})
  public socialFacebook?: string | null;

  @Domain.property({type: String})
  public socialGoogle?: string | null;

  @Domain.property({type: String})
  public socialInstagram?: string | null;

  @Domain.property({type: String})
  public socialLinkedin?: string | null;

  @Domain.property({type: String})
  public socialRumble?: string | null;

  @Domain.property({type: String})
  public socialTelegram?: string | null;

  @Domain.property({type: String})
  public socialTiktok?: string | null;

  @Domain.property({type: String})
  public socialX?: string | null;

  @Domain.property({type: String})
  public socialYoutube?: string | null;

  @Domain.property()
  public ownedBy?: Company;

  @Domain.property()
  public company?: Company;

  @Domain.property({type: MerchiFile})
  public logo?: MerchiFile | null;

  @Domain.property({type: MerchiFile})
  public favicon?: MerchiFile | null;

  @Domain.property()
  public activeTheme?: Theme;

  @Domain.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Domain.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  @Domain.property({arrayType: 'Domain'})
  public canSupply?: Domain[];

  @Domain.property({arrayType: 'Domain'})
  public suppliedBy?: Domain[];

  @Domain.property({arrayType: 'User'})
  public accessibleClients?: User[];

  @Domain.property({arrayType: 'Company'})
  public accessibleClientCompanies?: Company[];

  @Domain.property({arrayType: 'Menu'})
  public menus?: Menu[];

  @Domain.property({arrayType: 'Session'})
  public sessions?: Session[];

  @Domain.property({arrayType: 'Category'})
  public categories?: Category[];

  @Domain.property({arrayType: 'Notification'})
  public notifications?: Notification[];

  @Domain.property({arrayType: 'Product'})
  public products?: Product[];

  @Domain.property({arrayType: 'SupplyDomain'})
  public supplyProducts?: SupplyDomain[];

  @Domain.property({arrayType: 'Job'})
  public jobs?: Job[];

  @Domain.property({arrayType: 'User'})
  public jobsAssignees?: User[];

  @Domain.property({arrayType: 'Cart'})
  public carts?: Cart[];

  @Domain.property({arrayType: 'EnrolledDomain'})
  public enrollments?: EnrolledDomain[];

  @Domain.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @Domain.property({arrayType: 'DomainInvitation'})
  public domainInvitations?: DomainInvitation[];

  @Domain.property({arrayType: 'SeoDomainPage'})
  public seoDomainPages?: SeoDomainPage[];

  @Domain.property({arrayType: 'Theme'})
  public themes?: Theme[];

  public defaultTaxType = () => {
    if (this.company === undefined) {
      throw new Error('company is undefined, did you forget to embed it?');
    }
    if (this.company.defaultTaxType === undefined) {
      const err = 'company.defaultTaxType is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    return this.company.defaultTaxType;
  };

  public getActiveTheme = (): Theme => {
    if (this.activeTheme === undefined) {
      throw new Error('activeTheme is undefined, did you forget to embed it?');
    }
    return this.activeTheme!;
  };
}


// based on above model, generate a JSON version type
export type DomainJson = {
  id: number;
  archived: string | null;
  domain: string;
  country: string;
  currency: string;
  callToActions: string;
  callToActionDetails: any[];
  isMaster: boolean;
  deploymentOnline: boolean;
  deploymentInProgress: boolean;
  deploymentSucceeded: boolean;
  deploymentMessage: string;
  deploymentKey: string;
  internalUseNotes: string;
  internalUseAiContext: string;
  aiContext: string;
  domainType: DomainType;
  subDomain: string;
  emailDomain: string;
  smsName: string;
  showDomainPublicly: boolean;
  publicAccessRestricted: boolean;
  showDomainToAccessibleEntitiesOnly: boolean;
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  mailgunRecords: any[];
  enableNotifications: boolean;
  trackingCodeGoogleConversion: string | null;
  trackingCodeGoogleGlobal: string | null;
  apiSecret: string | null;
  webflowApiKey: string | null;
  shopifyShopUrl: string | null;
  shopifyIsActive: boolean;
  qrShopQrCode: string | null;
  unltdAiApiOrganizationId: string;
  unltdAiApiSecretKey: string;
  scalablePressApiKey: string;
  socialBitchute: string | null;
  socialDiscord: string | null;
  socialFacebook: string | null;
  socialGoogle: string | null;
  socialInstagram: string | null;
  socialLinkedin: string | null;
  socialRumble: string | null;
  socialTelegram: string | null;
  socialTiktok: string | null;
  socialX: string | null;
  socialYoutube: string | null;
  ownedBy: CompanyJson;
  company: CompanyJson;
  logo: MerchiFileJson | null;
  favicon: MerchiFileJson | null;
  activeTheme: ThemeJson;
  internalTags: InternalTagJson[];
  tags: DomainTagJson[];
  canSupply: DomainJson[];
  suppliedBy: DomainJson[];
  accessibleClients: CompanyJson[];
  accessibleClientCompanies: CompanyJson[];
  menus: MenuJson[];
  sessions: SessionJson[];
  categories: CategoryJson[];
  notifications: NotificationJson[];
  products: ProductJson[];
  supplyProducts: SupplyDomainJson[];
  jobs: JobJson[];
  jobsAssignees: CompanyJson[];
  carts: CartJson[];
  enrollments: EnrolledDomainJson[];
  invoices: InvoiceJson[];
  domainInvitations: DomainInvitationJson[];
  seoDomainPages: SeoDomainPageJson[];
  themes: ThemeJson[];
};
