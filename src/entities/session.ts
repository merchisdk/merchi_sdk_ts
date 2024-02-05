import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { User } from './user.js';

export class Session extends Entity {
  protected static resourceName = 'sessions';
  protected static singularName = 'session';
  protected static pluralName = 'sessions';
  protected static primaryKey = 'token';

  @Session.property({type: Date})
  public archived?: Date | null;

  @Session.property({type: String})
  public ip?: string | null;

  @Session.property()
  public token?: string;

  @Session.property({type: Boolean})
  public remember?: boolean | null;

  @Session.property()
  public user?: User;

  @Session.property({type: Domain})
  public domain?: Domain | null;
}
