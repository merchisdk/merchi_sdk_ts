import { Assignment } from './assignment.js';
import { Entity } from '../entity.js';
import { MerchiFile } from './file.js';
import { Notification } from './notification.js';
import { User } from './user.js';

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
