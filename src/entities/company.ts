import { Address, AddressJson } from './address.js';
import { AutomaticPaymentRelationship, AutomaticPaymentRelationshipJson } from './automatic_payment_relationship.js';
import { Bank, BankJson } from './bank.js';
import { Cart, CartJson } from './cart.js';
import { CompanyInvitation, CompanyInvitationJson } from './company_invitation.js';
import { CountryTax, CountryTaxJson } from './country_tax.js';
import { Domain, DomainJson } from './domain.js';
import { EmailAddress, EmailAddressJson } from './email_address.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { InternalTag, InternalTagJson } from './internal_tag.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { PhoneNumber, PhoneNumberJson } from './phone_number.js';
import { Product, ProductJson } from './product.js';
import { Shipment, ShipmentJson } from './shipment.js';
import { User, UserJson } from './user.js';
import { UserCompany, UserCompanyJson } from './user_company.js';
import { SubscriptionPlan, SubscriptionPlanJson } from './subscription_plan.js';
import { PaymentDevice, PaymentDeviceJson } from './payment_device.js';

export class Company extends Entity {
  protected static resourceName = 'companies';
  protected static singularName = 'company';
  protected static pluralName = 'companies';

  @Company.property({type: Date})
  public archived?: Date | null;

  @Company.property()
  public id?: number;

  @Company.property()
  public name?: string;

  @Company.property()
  public callToActions?: string;

  @Company.property()
  public callToActionDetails?: any[];

  @Company.property({type: String})
  public website?: string | null;

  @Company.property()
  public ownershipUnconfirmed?: boolean;

  @Company.property({type: String})
  public taxNumber?: string | null;

  @Company.property({type: String})
  public taxNumberType?: string | null;

  @Company.property({type: String})
  public paypalAccount?: string | null;

  @Company.property({type: String})
  public paypalPassword?: string | null;

  @Company.property({type: String})
  public paypalSignature?: string | null;

  @Company.property()
  public isPaypalValid?: boolean;

  @Company.property({embeddedByDefault: false})
  public isStripeAccountEnabled?: boolean;

  @Company.property()
  public stripeAccountId?: string;

  @Company.property({type: String})
  public stripeCustomerId?: string;

  @Company.property()
  public sendleActive?: boolean;

  @Company.property({type: String})
  public sendleApiKey?: string;

  @Company.property({type: String})
  public sendleId?: string;

  @Company.property({type: String})
  public unltdAiApiOrganizationId?: string;

  @Company.property({type: String})
  public unltdAiApiSecretKey?: string;

  @Company.property({type: String})
  public internalUseNotes?: string;

  @Company.property({type: String})
  public internalUseAiContext?: string;

  @Company.property({type: String})
  public aiContext?: string;

  @Company.property()
  public isNew?: boolean;

  @Company.property()
  public subscriptionOutstanding?: boolean;

  @Company.property({type: Date})
  public trialEndDate?: Date | null;

  @Company.property({type: Date})
  public trialEndDateUpdated?: Date | null;

  @Company.property({type: 'User'})
  public trialEndDateSetBy?: User;

  @Company.property()
  public isBlocked?: boolean;

  @Company.property()
  public isTesting?: boolean;

  @Company.property({type: String})
  public squareAccessToken?: string | null;

  @Company.property({type: String})
  public squareRefreshToken?: string | null;

  @Company.property({type: Date})
  public squareExpiresAt?: Date | null;

  @Company.property()
  public squareIsValid?: boolean;

  @Company.property({type: String})
  public squareMerchantId?: string | null;

  @Company.property({type: String})
  public squareWebLocationId?: string | null;

  @Company.property({type: String})
  public stripePublishableTestKey?: string | null;

  @Company.property({type: String})
  public stripeApiTestKey?: string | null;

  @Company.property({type: String})
  public stripePublishableKey?: string | null;

  @Company.property({type: String})
  public stripeApiKey?: string | null;

  @Company.property()
  public stripeConnectDisabled?: boolean;

  @Company.property()
  public isPayingCompany?: boolean;

  @Company.property()
  public isStripeValid?: boolean;

  @Company.property()
  public acceptSquare?: boolean;

  @Company.property()
  public acceptStripe?: boolean;

  @Company.property()
  public acceptPaypal?: boolean;

  @Company.property()
  public acceptUtrust?: boolean;

  @Company.property({type: String})
  public utrustApiKey?: string | null;

  @Company.property({type: String})
  public utrustWebhookKey?: string | null;

  @Company.property()
  public isUtrustValid?: boolean;

  @Company.property()
  public acceptBankTransfer?: boolean;

  @Company.property()
  public acceptPhonePayment?: boolean;

  @Company.property()
  public defaultCurrency?: string;

  @Company.property()
  public country?: string;

  @Company.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Company.property({type: MerchiFile})
  public logo?: MerchiFile | null;

  @Company.property({type: 'CountryTax'})
  public defaultTaxType?: CountryTax | null;

  @Company.property({arrayType: 'AutomaticPaymentRelationship'})
  public automaticPaymentRelationships?: AutomaticPaymentRelationship[];

  @Company.property({arrayType: 'CountryTax'})
  public taxTypes?: CountryTax[];

  @Company.property({arrayType: 'PaymentDevice'})
  public paymentDevices?: PaymentDevice[];

  @Company.property({type: SubscriptionPlan})
  public subscriptionPlan?: SubscriptionPlan | null;

  @Company.property({arrayType: 'EmailAddress'})
  public _emailAddresses?: EmailAddress[];

  @Company.property({arrayType: 'PhoneNumber'})
  public _paymentPhoneNumbers?: PhoneNumber[];

  @Company.property({arrayType: 'PhoneNumber'})
  public _phoneNumbers?: PhoneNumber[];

  @Company.property({arrayType: 'Address'})
  public _addresses?: Address[];

  @Company.property({arrayType: 'UserCompany'})
  public _users?: UserCompany[];

  @Company.property({arrayType: 'Shipment'})
  public shipmentsAsSender?: Shipment[];

  @Company.property({arrayType: 'Shipment'})
  public shipmentsAsReceiver?: Shipment[];

  @Company.property({arrayType: 'Product'})
  public savedProducts?: Product[];

  @Company.property({arrayType: 'Bank'})
  public banks?: Bank[];

  @Company.property({arrayType: 'UserCompany'})
  public userCompanies?: UserCompany[];

  @Company.property({arrayType: 'CompanyInvitation'})
  public companyInvitations?: CompanyInvitation[];

  @Company.property({arrayType: 'Job'})
  public appliedJobs?: Job[];

  @Company.property({arrayType: 'Cart'})
  public carts?: Cart[];

  @Company.property({arrayType: 'Domain'})
  public domains?: Domain[];

  @Company.property({arrayType: 'Domain'})
  public accessibleDomainsAsClientCompany?: Domain[];

  @Company.property({arrayType: 'EmailAddress'})
  public emailAddresses?: EmailAddress[];

  @Company.property({arrayType: 'PhoneNumber'})
  public phoneNumbers?: PhoneNumber[];

  @Company.property({arrayType: 'PhoneNumber'})
  public paymentPhoneNumbers?: PhoneNumber[];

  @Company.property({arrayType: 'Invoice'})
  public invoicesHas?: Invoice[];

  @Company.property({arrayType: 'Invoice'})
  public subscriptionInvoices?: Invoice[];

  @Company.property({arrayType: 'Address'})
  public addresses?: Address[];
}


// Company JSON type
export type CompanyJson = {
  archived?: string | null;
  id?: number;
  name?: string;
  callToActions?: string;
  callToActionDetails?: any[];
  website?: string | null;
  ownershipUnconfirmed?: boolean;
  taxNumber?: string | null;
  taxNumberType?: string | null;
  paypalAccount?: string | null;
  paypalPassword?: string | null;
  paypalSignature?: string | null;
  isPaypalValid?: boolean;
  isStripeAccountEnabled?: boolean;
  stripeAccountId?: string;
  stripeCustomerId?: string;
  sendleActive?: boolean;
  sendleApiKey?: string;
  sendleId?: string;
  unltdAiApiOrganizationId?: string;
  unltdAiApiSecretKey?: string;
  internalUseNotes?: string;
  internalUseAiContext?: string;
  aiContext?: string;
  isNew?: boolean;
  subscriptionOutstanding?: boolean;
  trialEndDate?: string | null;
  trialEndDateUpdated?: string | null;
  trialEndDateSetBy?: UserJson;
  isBlocked?: boolean;
  isTesting?: boolean;
  squareAccessToken?: string | null;
  squareRefreshToken?: string | null;
  squareExpiresAt?: string | null;
  squareIsValid?: boolean;
  squareMerchantId?: string | null;
  squareWebLocationId?: string | null;
  stripePublishableTestKey?: string | null;
  stripeApiTestKey?: string | null;
  stripePublishableKey?: string | null;
  stripeApiKey?: string | null;
  stripeConnectDisabled?: boolean;
  isPayingCompany?: boolean;
  isStripeValid?: boolean;
  acceptSquare?: boolean;
  acceptStripe?: boolean;
  acceptPaypal?: boolean;
  acceptUtrust?: boolean;
  utrustApiKey?: string | null;
  utrustWebhookKey?: string | null;
  isUtrustValid?: boolean;
  acceptBankTransfer?: boolean;
  acceptPhonePayment?: boolean;
  defaultCurrency?: string;
  country?: string;
  internalTags?: InternalTagJson[];
  logo?: MerchiFileJson | null;
  defaultTaxType?: CountryTaxJson | null;
  automaticPaymentRelationships?: AutomaticPaymentRelationshipJson[];
  taxTypes?: CountryTaxJson[];
  paymentDevices?: PaymentDeviceJson[];
  subscriptionPlan?: SubscriptionPlanJson | null;
  _emailAddresses?: EmailAddressJson[];
  _paymentPhoneNumbers?: PhoneNumberJson[];
  _phoneNumbers?: PhoneNumberJson[];
  _addresses?: AddressJson[];
  _users?: UserCompanyJson[];
  shipmentsAsSender?: ShipmentJson[];
  shipmentsAsReceiver?: ShipmentJson[];
  savedProducts?: ProductJson[];
  banks?: BankJson[];
  userCompanies?: UserCompanyJson[];
  companyInvitations?: CompanyInvitationJson[];
  appliedJobs?: JobJson[];
  carts?: CartJson[];
  domains?: DomainJson[];
  accessibleDomainsAsClientCompany?: DomainJson[];
  emailAddresses?: EmailAddressJson[];
  phoneNumbers?: PhoneNumberJson[];
  paymentPhoneNumbers?: PhoneNumberJson[];
  invoicesHas?: InvoiceJson[];
  subscriptionInvoices?: InvoiceJson[];
  addresses?: AddressJson[];
}
