import { Backup, BackupJson } from './backup.js';
import { Company, CompanyJson } from './company.js';
import { Component, ComponentJson } from './component.js';
import { Domain, DomainJson } from './domain.js';
import { Draft, DraftJson } from './draft.js';
import { DraftComment, DraftCommentJson } from './draft_comment.js';
import { Entity } from '../entity.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { JobComment, JobCommentJson } from './job_comment.js';
import { Notification, NotificationJson } from './notification.js';
import { Product, ProductJson } from './product.js';
import { ProductionComment, ProductionCommentJson } from './production_comment.js';
import { Theme, ThemeJson } from './theme.js';
import { User, UserJson } from './user.js';
import { Variation, VariationJson } from './variation.js';
import { VariationFieldsOption, VariationFieldsOptionJson } from './variation_fields_option.js';

export class MerchiFile extends Entity {
  protected static resourceName = 'files';
  protected static singularName = 'file';
  protected static pluralName = 'files';

  public fileData?: File;

  public fromFormFile = (file: File) => {
    this.fileData = file;
    this.mimetype = file.type || 'application/octet-stream';
    this.name = file.name;
    this.size = file.size;
  };

  @MerchiFile.property({type: Date})
  public archived?: Date | null;

  @MerchiFile.property()
  public id?: number;

  @MerchiFile.property()
  public uploadId?: string;

  @MerchiFile.property({type: String})
  public name?: string | null;

  @MerchiFile.property({type: String})
  public mimetype?: string | null;

  @MerchiFile.property()
  public size?: number;

  @MerchiFile.property({type: Date})
  public creationDate?: Date | null;

  @MerchiFile.property({type: String})
  public cachedViewUrl?: string | null;

  @MerchiFile.property({type: Date})
  public viewUrlExpires?: Date | null;

  @MerchiFile.property({type: String})
  public cachedDownloadUrl?: string | null;

  @MerchiFile.property({type: Date})
  public downloadUrlExpires?: Date | null;

  @MerchiFile.property({type: User})
  public uploader?: User | null;

  @MerchiFile.property()
  public viewUrl?: string;

  @MerchiFile.property()
  public downloadUrl?: string;

  @MerchiFile.property({arrayType: 'Component'})
  public components?: Component[];

  @MerchiFile.property({arrayType: 'Component'})
  public componentFeatureImages?: Component[];

  @MerchiFile.property({arrayType: 'DraftComment'})
  public draftComments?: DraftComment[];

  @MerchiFile.property({arrayType: 'Variation'})
  public variations?: Variation[];

  @MerchiFile.property({arrayType: 'Backup'})
  public backups?: Backup[];

  @MerchiFile.property({arrayType: 'Notification'})
  public notification?: Notification[];

  @MerchiFile.property({arrayType: 'Company'})
  public companyLogos?: Company[];

  @MerchiFile.property({arrayType: 'Product'})
  public products?: Product[];

  @MerchiFile.property({arrayType: 'Product'})
  public featuredProducts?: Product[];

  @MerchiFile.property({arrayType: 'Draft'})
  public drafts?: Draft[];

  @MerchiFile.property({arrayType: 'VariationFieldsOption'})
  public options?: VariationFieldsOption[];

  @MerchiFile.property({arrayType: 'JobComment'})
  public jobComments?: JobComment[];

  @MerchiFile.property({arrayType: 'Job'})
  public jobs?: Job[];

  @MerchiFile.property({arrayType: 'Job'})
  public clientJobs?: Job[];

  @MerchiFile.property({arrayType: 'Domain'})
  public domainLogos?: Domain[];

  @MerchiFile.property({arrayType: 'Domain'})
  public domainFavicons?: Domain[];

  @MerchiFile.property({arrayType: 'User'})
  public userProfilePictures?: User[];

  @MerchiFile.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @MerchiFile.property({arrayType: 'Invoice'})
  public invoicesPaid?: Invoice[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeMainCss?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeMainCssUsing?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeMainCssEditing?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeEmailCss?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeEmailCssUsing?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeEmailCssEditing?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themes?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeFeatureImages?: Theme[];

  @MerchiFile.property({arrayType: 'Theme'})
  public themeImages?: Theme[];

  @MerchiFile.property({arrayType: 'ProductionComment'})
  public productionComments?: ProductionComment[];

  public isImage = () => {
    if (this.mimetype === undefined) {
      const err = 'mimetype is undefined, did you forget to embed it?';
      throw new Error(err);
    }
    if (this.mimetype === null) {
      return false;
    }
    return this.mimetype.split('/')[0] === 'image';
  };
}


// based on above model, generate a JSON version type
export type MerchiFileJson = {
  id: number;
  archived: string | null;
  uploadId: string;
  name: string | null;
  mimetype: string | null;
  size: number;
  creationDate: string | null;
  cachedViewUrl: string | null;
  viewUrlExpires: string | null;
  cachedDownloadUrl: string | null;
  downloadUrlExpires: string | null;
  uploader: UserJson | null;
  viewUrl: string;
  downloadUrl: string;
  components: ComponentJson[];
  componentFeatureImages: ComponentJson[];
  draftComments: DraftCommentJson[];
  variations: VariationJson[];
  backups: BackupJson[];
  notification: NotificationJson[];
  companyLogos: CompanyJson[];
  products: ProductJson[];
  featuredProducts: ProductJson[];
  drafts: DraftJson[];
  options: VariationFieldsOptionJson[];
  jobComments: JobCommentJson[];
  jobs: JobJson[];
  clientJobs: JobJson[];
  domainLogos: DomainJson[];
  domainFavicons: DomainJson[];
  userProfilePictures: UserJson[];
  invoices: InvoiceJson[];
  invoicesPaid: InvoiceJson[];
  themeMainCss: ThemeJson[];
  themeMainCssUsing: ThemeJson[];
  themeMainCssEditing: ThemeJson[];
  themeEmailCss: ThemeJson[];
  themeEmailCssUsing: ThemeJson[];
  themeEmailCssEditing: ThemeJson[];
  themes: ThemeJson[];
  themeFeatureImages: ThemeJson[];
  themeImages: ThemeJson[];
  productionComments: ProductionCommentJson[];
};
