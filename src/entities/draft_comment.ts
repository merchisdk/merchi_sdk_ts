import { Entity } from '../entity.js';
import { Draft, DraftJson } from './draft.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { Job, JobJson } from './job.js';
import { Notification, NotificationJson } from './notification.js';
import { User, UserJson } from './user.js';

export class DraftComment extends Entity {
  protected static resourceName = 'draft_comments';
  protected static singularName = 'draftComment';
  protected static pluralName = 'draftComments';

  @DraftComment.property({type: Date})
  public archived?: Date | null;

  @DraftComment.property()
  public id?: number;

  @DraftComment.property({type: Date})
  public date?: Date | null;

  @DraftComment.property()
  public urgency?: number;

  @DraftComment.property()
  public text?: string;

  @DraftComment.property()
  public changeRequest?: boolean;

  @DraftComment.property()
  public sendSms?: boolean;

  @DraftComment.property()
  public sendEmail?: boolean;

  @DraftComment.property()
  public user?: User;

  @DraftComment.property({arrayType: "MerchiFile"})
  public files?: MerchiFile[];

  @DraftComment.property({arrayType: 'User'})
  public forwards?: User[];

  @DraftComment.property({arrayType: 'Notification'})
  public notifications?: Notification[];

  @DraftComment.property({type: Draft})
  public draft?: Draft | null;

  @DraftComment.property({type: Job})
  public job?: Job | null;
}


// based on model, generate coresponding JSON type
export type DraftCommentJson = {
  archived?: string | null;
  id?: number;
  date?: string | null;
  urgency?: number;
  text?: string;
  changeRequest?: boolean;
  sendSms?: boolean;
  sendEmail?: boolean;
  user?: UserJson;
  files?: MerchiFileJson[];
  forwards?: UserJson[];
  notifications?: NotificationJson[];
  draft?: DraftJson | null;
  job?: JobJson | null;
};
