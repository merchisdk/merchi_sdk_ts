import { Domain, DomainJson } from './domain.js';
import { Entity } from '../entity.js';
import { User, UserJson } from './user.js';

export class DomainInvitation extends Entity {
  protected static resourceName = 'domain_invitations';
  protected static singularName = 'domainInvitation';
  protected static pluralName = 'domainInvitations';

  @DomainInvitation.property({type: Date})
  public archived?: Date | null;

  @DomainInvitation.property()
  public id?: number;

  @DomainInvitation.property()
  public userName?: string;

  @DomainInvitation.property()
  public userEmail?: string;

  @DomainInvitation.property()
  public role?: number;

  @DomainInvitation.property()
  public token?: string;

  @DomainInvitation.property()
  public domain?: Domain;

  @DomainInvitation.property()
  public sender?: User;

  @DomainInvitation.property({type: Date})
  public user?: User | null;
}

// based on above model, generate a JSON version type
export type DomainInvitationJson = {
  id: number;
  archived: string | null;
  userName: string;
  userEmail: string;
  role: number;
  token: string;
  domain: DomainJson;
  sender: UserJson;
  user: UserJson | null;
}
