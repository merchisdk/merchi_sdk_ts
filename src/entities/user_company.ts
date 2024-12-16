import { Company, CompanyJson } from './company.js';
import { Entity } from '../entity.js';
import { User, UserJson } from './user.js';

export class UserCompany extends Entity {
  protected static resourceName = 'user_companies';
  protected static singularName = 'userCompany';
  protected static pluralName = 'userCompanies';

  @UserCompany.property({type: Date})
  public archived?: Date | null;

  @UserCompany.property()
  public id?: number;

  @UserCompany.property({type: Boolean})
  public main?: boolean | null;

  @UserCompany.property()
  public isAdmin?: boolean;

  @UserCompany.property({type: User})
  public user?: User | null;

  @UserCompany.property({type: Company})
  public company?: Company | null;
}

// based on model, generated corresponding JSON type
export type UserCompanyJson = {
  archived?: string | null;
  id?: number;
  main?: boolean | null;
  isAdmin?: boolean;
  user?: UserJson | null;
  company?: CompanyJson | null;
};
