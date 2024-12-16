import { Address, AddressJson } from './address.js';
import { Cart, CartJson } from './cart.js';
import { Company, CompanyJson } from './company.js';
import { Domain, DomainJson } from './domain.js';
import { DomainTag, DomainTagJson } from './domain_tag.js';
import { EmailAddress, EmailAddressJson } from './email_address.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { InternalTag, InternalTagJson } from './internal_tag.js';
import { Item, ItemJson } from './item.js';
import { Job, JobJson } from './job.js';
import { Quote, QuoteJson } from './quote.js';
import { Notification, NotificationJson } from './notification.js';
import { Payment, PaymentJson } from './payment.js';
import { PhoneNumber, PhoneNumberJson } from './phone_number.js';
import { Shipment, ShipmentJson } from './shipment.js';
import { User, UserJson } from './user.js';

export class Invoice extends Entity {
  protected static resourceName = 'invoices';
  protected static singularName = 'invoice';
  protected static pluralName = 'invoices';

  @Invoice.property({type: Date})
  public archived?: Date | null;

  @Invoice.property()
  public id?: number;

  @Invoice.property({type: Date})
  public creationDate?: Date | null;

  @Invoice.property({type: Date})
  public paymentDeadline?: Date | null;

  @Invoice.property({type: Date})
  public reminded?: Date | null;

  @Invoice.property()
  public reminderMessage?: string;

  @Invoice.property()
  public shopifyOrderId?: string;

  @Invoice.property()
  public forceReminders?: boolean;

  @Invoice.property()
  public buySide?: boolean;

  @Invoice.property()
  public canAutoPay?: boolean;

  @Invoice.property({type: String})
  public note?: string | null;

  @Invoice.property({type: Date})
  public terms?: Date | null;

  @Invoice.property({type: Number})
  public subtotalCost?: number | null;

  @Invoice.property({type: Number})
  public taxAmount?: number | null;

  @Invoice.property({type: Number})
  public totalCost?: number | null;

  @Invoice.property({type: Boolean})
  public sendSms?: boolean | null;

  @Invoice.property({type: Boolean})
  public sendEmail?: boolean | null;

  @Invoice.property({type: Boolean})
  public unpaid?: boolean | null;

  @Invoice.property()
  public currency?: string;

  @Invoice.property()
  public acceptSquare?: boolean;

  @Invoice.property()
  public acceptStripe?: boolean;

  @Invoice.property()
  public acceptPaypal?: boolean;

  @Invoice.property()
  public acceptUtrust?: boolean;

  @Invoice.property()
  public acceptBankTransfer?: boolean;

  @Invoice.property()
  public acceptPhonePayment?: boolean;

  @Invoice.property({type: String})
  public invoiceToken?: string | null;

  @Invoice.property()
  public isRemindable?: boolean;

  @Invoice.property({embeddedByDefault: false})
  public owedMoney?: number;

  @Invoice.property({embeddedByDefault: false})
  public paidMoney?: number;

  @Invoice.property({embeddedByDefault: false})
  public isCompletelyPaid?: boolean;

  @Invoice.property({type: User})
  public responsibleManager?: User | null;

  @Invoice.property({type: User})
  public creator?: User | null;

  @Invoice.property()
  public client?: User;

  @Invoice.property({type: Company})
  public clientCompany?: Company | null;

  @Company.property({arrayType: 'Company'})
  public subscriptionCompanies?: Company[];

  @Invoice.property({type: Address})
  public shipping?: Address | null;

  @Invoice.property()
  public domain?: Domain;

  @Invoice.property({arrayType: 'Item'})
  public items?: Item[];

  @Invoice.property({type: MerchiFile})
  public pdf?: MerchiFile | null;

  @Invoice.property({type: MerchiFile})
  public receipt?: MerchiFile | null;

  @Invoice.property({type: PhoneNumber})
  public clientPhone?: PhoneNumber | null;

  @Invoice.property({type: EmailAddress})
  public clientEmail?: EmailAddress | null;

  @Invoice.property({type: PhoneNumber})
  public clientCompanyPhone?: PhoneNumber | null;

  @Invoice.property({type: EmailAddress})
  public clientCompanyEmail?: EmailAddress | null;

  @Invoice.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Invoice.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  @Invoice.property({arrayType: 'Shipment'})
  public shipments?: Shipment[];

  @Invoice.property({arrayType: 'Notification'})
  public notifications?: Notification[];

  @Invoice.property({arrayType: 'Job'})
  public jobs?: Job[];

  @Invoice.property({arrayType: 'Quote'})
  public quotes?: Quote[];

  @Invoice.property()
  public cart?: Cart;

  @Invoice.property({arrayType: 'Payment'})
  public payments?: Payment[];
}

// JSON version of the model
export type InvoiceJson = {
  archived: string | null;
  id: number;
  client: UserJson;
  clientCompany: CompanyJson | null;
  creationDate: string | null;
  paymentDeadline: string | null;
  reminded: string | null;
  reminderMessage: string;
  shopifyOrderId: string;
  forceReminders: boolean;
  buySide: boolean;
  canAutoPay: boolean;
  note: string | null;
  terms: string | null;
  subtotalCost: number | null;
  taxAmount: number | null;
  totalCost: number | null;
  sendSms: boolean | null;
  sendEmail: boolean | null;
  unpaid: boolean | null;
  currency: string;
  acceptSquare: boolean;
  acceptStripe: boolean;
  acceptPaypal: boolean;
  acceptUtrust: boolean;
  acceptBankTransfer: boolean;
  acceptPhonePayment: boolean;
  invoiceToken: string | null;
  isRemindable: boolean;
  owedMoney: number;
  paidMoney: number;
  isCompletelyPaid: boolean;
  responsibleManager: UserJson | null;
  creator: UserJson | null;
  shipping: AddressJson | null;
  domain: DomainJson;
  items: ItemJson[];
  pdf: MerchiFileJson | null;
  receipt: MerchiFileJson | null;
  clientPhone: PhoneNumberJson | null;
  clientEmail: EmailAddressJson | null;
  clientCompanyPhone: PhoneNumberJson | null;
  clientCompanyEmail: EmailAddressJson | null;
  internalTags: InternalTagJson[];
  tags: DomainTagJson[];
  shipments: ShipmentJson[];
  notifications: NotificationJson[];
  jobs: JobJson[];
  quotes: QuoteJson[];
  cart: CartJson;
  payments: PaymentJson[];
}
