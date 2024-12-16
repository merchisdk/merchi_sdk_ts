import { Company, CompanyJson } from './company.js';
import { Entity } from '../entity.js';
import { User, UserJson } from './user.js';

export class PhoneNumber extends Entity {
  protected static resourceName = 'phone_numbers';
  protected static singularName = 'phoneNumber';
  protected static pluralName = 'phoneNumbers';

  @PhoneNumber.property({type: Date})
  public archived?: Date | null;

  @PhoneNumber.property()
  public id?: number;

  @PhoneNumber.property()
  public number?: string;

  @PhoneNumber.property()
  public code?: string;

  @PhoneNumber.property({arrayType: 'User'})
  public users?: User[];

  @PhoneNumber.property({arrayType: 'Company'})
  public companies?: Company[];

  @PhoneNumber.property({arrayType: 'Company'})
  public paymentCompanies?: Company[];

  @PhoneNumber.property({embeddedByDefault: false})
  public localFormatNumber?: string;

  @PhoneNumber.property({embeddedByDefault: false})
  public internationalFormatNumber?: string;
}


// based current model, generate JSON type
export type PhoneNumberJson = {
  archived?: string | null;
  id?: number;
  number?: string;
  code?: string;
  users?: UserJson[];
  companies?: CompanyJson[];
  paymentCompanies?: CompanyJson[];
  localFormatNumber?: string;
  internationalFormatNumber?: string;
};
