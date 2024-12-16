import { Address, AddressJson } from './address.js';
import { Company, CompanyJson } from './company.js';
import { Entity } from '../entity.js';

export class Bank extends Entity {
  protected static resourceName = 'banks';
  protected static singularName = 'bank';
  protected static pluralName = 'banks';

  @Bank.property({type: Date})
  public archived?: Date | null;

  @Bank.property()
  public id?: number;

  @Bank.property()
  public default?: boolean;

  @Bank.property()
  public bankName?: string;

  @Bank.property()
  public accountNumber?: string;

  @Bank.property()
  public accountName?: string;

  @Bank.property({type: String})
  public bsb?: string | null;

  @Bank.property({type: String})
  public swiftCode?: string | null;

  @Bank.property({type: String})
  public iban?: string | null;

  @Bank.property({type: String})
  public bankCode?: string | null;

  @Bank.property({type: 'Address'})
  public bankAddress?: Address | null;

  @Bank.property()
  public company?: Company;
}

// based on above model, generate a JSON version type
export type BankJson = {
  id: number;
  archived: string | null;
  default: boolean;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bsb: string | null;
  swiftCode: string | null;
  iban: string | null;
  bankCode: string | null;
  bankAddress: AddressJson | null;
  company: CompanyJson;
}
