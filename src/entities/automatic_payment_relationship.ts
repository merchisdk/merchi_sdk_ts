import { Company, CompanyJson } from './company.js';
import { Entity } from '../entity.js';

export class AutomaticPaymentRelationship extends Entity {
  protected static resourceName = 'automatic_payment_relationships';
  protected static singularName = 'automaticPaymentRelationship';
  protected static pluralName = 'automaticPaymentRelationships';

  @AutomaticPaymentRelationship.property({type: Date})
  public archived?: Date | null;

  @AutomaticPaymentRelationship.property()
  public id?: number;

  @AutomaticPaymentRelationship.property()
  public creationDate?: Date;

  @AutomaticPaymentRelationship.property()
  public allowPostPayment?: boolean;

  @AutomaticPaymentRelationship.property({type: Company})
  public companyCustomer?: Company;

  @AutomaticPaymentRelationship.property({type: Company})
  public companySupplier?: Company;

  @AutomaticPaymentRelationship.property({type: String})
  public stripeCustomerId?: string;
}

// based on above model, generate a JSON version type
export type AutomaticPaymentRelationshipJson = {
  id: number;
  archived: string | null;
  creationDate: string;
  allowPostPayment: boolean;
  companyCustomer: CompanyJson;
  companySupplier: CompanyJson;
  stripeCustomerId: string;
}
