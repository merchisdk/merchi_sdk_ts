import { Assignment } from './assignment.js';
import { Company } from './company.js';
import { Domain } from './domain.js';
import { DomainTag } from './domain_tag.js';
import { Entity } from '../entity.js';
import { Invoice } from './invoice.js';
import { Job } from './job.js';
import { Notification } from './notification.js';
import { Product } from './product.js';
import { Shipment } from './shipment.js';
import { User } from './user.js';

export class Reminder extends Entity {
  protected static resourceName = 'reminders';
  protected static singularName = 'reminder';
  protected static pluralName = 'reminders';

  @Reminder.property()
  public id?: number;

  @Reminder.property()
  public user?: User;

  @Reminder.property({type: Date})
  public created?: Date;

  @Reminder.property({type: Date})
  public updated?: Date;

  @Reminder.property({type: Date})
  public remindDate?: Date;

  @Reminder.property()
  public message?: string;

  @Reminder.property({arrayType: 'DomainTag'})
  public domainTags?: DomainTag[];

  @Reminder.property({arrayType: 'User'})
  public remindUsers?: User[];

  @Reminder.property()
  public job?: Job;

  @Reminder.property()
  public product?: Product;

  @Reminder.property()
  public invoice?: Invoice;

  @Reminder.property()
  public domain?: Domain;

  @Reminder.property()
  public company?: Company;

  @Reminder.property()
  public shipment?: Shipment;

  @Reminder.property()
  public assignment?: Assignment;

  @Reminder.property({arrayType: 'Notification'})
  public notifications?: Notification[];
}
