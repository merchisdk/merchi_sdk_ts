import { Company, CompanyJson } from './company.js';
import { Entity } from '../entity.js';
import { User, UserJson } from './user.js';

export class CompanyInvitation extends Entity {
  protected static resourceName = 'company_invitations';
  protected static singularName = 'companyInvitation';
  protected static pluralName = 'companyInvitations';

  @CompanyInvitation.property({type: Date})
  public archived?: Date | null;

  @CompanyInvitation.property()
  public id?: number;

  @CompanyInvitation.property()
  public userName?: string;

  @CompanyInvitation.property()
  public userEmail?: string;

  @CompanyInvitation.property()
  public inviteAsAdmin?: boolean;

  @CompanyInvitation.property()
  public token?: string;

  @CompanyInvitation.property()
  public company?: Company;

  @CompanyInvitation.property()
  public sender?: User;
}


export type CompanyInvitationJson = {
  id: number;
  archived: string | null;
  userName: string;
  userEmail: string;
  inviteAsAdmin: boolean;
  token: string;
  company: CompanyJson;
  sender: UserJson;
}
