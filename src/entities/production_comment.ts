import { Assignment, AssignmentJson } from './assignment.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { Notification, NotificationJson } from './notification.js';
import { User, UserJson } from './user.js';

export class ProductionComment extends Entity {
  protected static resourceName = 'production_comments';
  protected static singularName = 'productionComment';
  protected static pluralName = 'productionComments';

  @ProductionComment.property({type: Date})
  public archived?: Date | null;

  @ProductionComment.property()
  public id?: number;

  @ProductionComment.property({type: Date})
  public date?: Date | null;

  @ProductionComment.property()
  public urgency?: number;

  @ProductionComment.property()
  public text?: string;

  @ProductionComment.property()
  public isUrgentQuestion?: boolean;

  @ProductionComment.property()
  public sendSms?: boolean;

  @ProductionComment.property()
  public sendEmail?: boolean;

  @ProductionComment.property({arrayType: "MerchiFile"})
  public files?: MerchiFile[];

  @ProductionComment.property()
  public user?: User;

  @ProductionComment.property({arrayType: 'User'})
  public forwards?: User[];

  @ProductionComment.property({arrayType: 'Notification'})
  public notifications?: Notification[];

  @ProductionComment.property()
  public assignment?: Assignment;
}


// based on model, generate coresponding JSON type
export type ProductionCommentJson = {
  archived?: string | null;
  id?: number;
  date?: string | null;
  urgency?: number;
  text?: string;
  isUrgentQuestion?: boolean;
  sendSms?: boolean;
  sendEmail?: boolean;
  files?: MerchiFileJson[];
  user?: UserJson;
  forwards?: UserJson[];
  notifications?: NotificationJson[];
  assignment?: AssignmentJson;
}
