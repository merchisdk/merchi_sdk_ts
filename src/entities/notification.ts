import {
  Assignment, AssignmentJson
} from './assignment.js';
import {
  Domain, DomainJson
} from './domain.js';
import {
  Draft, DraftJson
} from './draft.js';
import {
  DraftComment, DraftCommentJson
} from './draft_comment.js';
import {
  Entity
} from '../entity.js';
import {
  MerchiFile, MerchiFileJson
} from './file.js';
import {
  Invoice, InvoiceJson
} from './invoice.js';
import {
  Job, JobJson
} from './job.js';
import {
  JobComment, JobCommentJson
} from './job_comment.js';
import {
  ProductionComment, ProductionCommentJson
} from './production_comment.js';
import {
  ShortUrl, ShortUrlJson
} from './short_url.js';
import {
  User, UserJson
} from './user.js';

export class Notification extends Entity {
  protected static resourceName = 'notifications';
  protected static singularName = 'notification';
  protected static pluralName = 'notifications';

  @Notification.property({type: Date})
  public archived?: Date | null;

  @Notification.property()
  public id?: number;

  @Notification.property()
  public notificationType?: number;

  @Notification.property()
  public date?: Date;

  @Notification.property()
  public seen?: boolean;

  @Notification.property()
  public sendEmail?: boolean;

  @Notification.property()
  public sendSms?: boolean;

  @Notification.property()
  public urgency?: number;

  @Notification.property({type: String})
  public description?: string | null;

  @Notification.property({type: String})
  public subject?: string | null;

  @Notification.property()
  public message?: string;

  @Notification.property()
  public htmlMessage?: string;

  @Notification.property({type: String})
  public link?: string | null;

  @Notification.property()
  public section?: number;

  @Notification.property({type: ShortUrl})
  public shortUrl?: ShortUrl | null;

  @Notification.property()
  public recipient?: User;

  @Notification.property({type: User})
  public sender?: User | null;

  @Notification.property({type: Job})
  public relatedJob?: Job | null;

  @Notification.property({type: Draft})
  public relatedDraft?: Draft | null;

  @Notification.property({type: Assignment})
  public relatedAssignment?: Assignment | null;

  @Notification.property({type: Invoice})
  public relatedInvoice?: Invoice | null;

  @Notification.property({type: JobComment})
  public relatedJobComment?: JobComment | null;

  @Notification.property({type: DraftComment})
  public relatedDraftComment?: DraftComment | null;

  @Notification.property({type: ProductionComment})
  public relatedProductionComment?: ProductionComment | null;

  @Notification.property()
  public domain?: Domain;

  @Notification.property({type: MerchiFile})
  public avatar?: MerchiFile | null;

  @Notification.property({type: MerchiFile})
  public attachment?: MerchiFile | null;
}


// based on model, generate coresponding JSON type
export type NotificationJson = {
  archived?: string | null;
  id?: number;
  notificationType?: number;
  date?: string;
  seen?: boolean;
  sendEmail?: boolean;
  sendSms?: boolean;
  urgency?: number;
  description?: string | null;
  subject?: string | null;
  message?: string;
  htmlMessage?: string;
  link?: string | null;
  section?: number;
  shortUrl?: ShortUrlJson | null;
  recipient?: UserJson;
  sender?: UserJson | null;
  relatedJob?: JobJson | null;
  relatedDraft?: DraftJson | null;
  relatedAssignment?: AssignmentJson | null;
  relatedInvoice?: InvoiceJson | null;
  relatedJobComment?: JobCommentJson | null;
  relatedDraftComment?: DraftCommentJson | null;
  relatedProductionComment?: ProductionCommentJson | null;
  domain?: DomainJson;
  avatar?: MerchiFileJson | null;
  attachment?: MerchiFileJson | null;
};
