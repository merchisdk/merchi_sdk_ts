import { Entity } from '../entity.js';
import { User, UserJson } from './user.js';

export class SystemRole extends Entity {
  protected static resourceName = 'system_roles';
  protected static singularName = 'systemRole';
  protected static pluralName = 'systemRoles';

  @SystemRole.property()
  public id?: number;

  @SystemRole.property()
  public role?: number;

  @SystemRole.property()
  public user?: User;
}


// based on model, generated corresponding JSON type
export type SystemRoleJson = {
  id?: number;
  role?: number;
  user?: UserJson;
};
