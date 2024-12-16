import { Company } from './company.js';
import { Entity } from '../entity.js';
import { User } from './user.js';

export class EmailAddress extends Entity {
  protected static resourceName = 'email_addresses';
  protected static singularName = 'emailAddress';
  protected static pluralName = 'emailAddresses';

  @EmailAddress.property({type: Date})
  public archived?: Date | null;

  @EmailAddress.property()
  public id?: number;

  @EmailAddress.property()
  public emailAddress?: string;

  @EmailAddress.property({arrayType: 'User'})
  public users?: User[];

  @EmailAddress.property({arrayType: 'Company'})
  public companies?: Company[];
}

// based on above model, generate a JSON version type
export type EmailAddressJson = {
  id: number;
  archived: string | null;
  emailAddress: string;
  users: UserJson[];
  companies: CompanyJson[];
}

// Define missing Json types
type UserJson = any; // Replace 'any' with the actual structure
type CompanyJson = any;
