import { Address, AddressJson } from './address.js';
import { Assignment, AssignmentJson } from './assignment.js';
import { Company, CompanyJson } from './company.js';
import { CountryTax, CountryTaxJson } from './country_tax.js';
import { DomainTag, DomainTagJson } from './domain_tag.js';
import { Entity } from '../entity.js';
import { InternalTag } from './internal_tag.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Quote, QuoteJson } from './quote.js';
import { Job, JobJson } from './job.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { User, UserJson } from './user.js';
import { ShipmentItem, ShipmentItemJson } from './shipment_item.js';
import { ShipmentMethod, ShipmentMethodJson } from './shipment_method.js';

interface CalculateOptions {
  strictEmbed?: boolean;
}

export class Shipment extends Entity {
  protected static resourceName = 'shipments';
  protected static singularName = 'shipment';
  protected static pluralName = 'shipments';

  @Shipment.property({type: Date})
  public archived?: Date | null;

  @Shipment.property()
  public id?: number;

  @Shipment.property()
  public name?: string;

  @Shipment.property()
  public shipmentServiceBookingInfo?: string;

  @Shipment.property()
  public shipmentServiceQuote?: string;

  @Shipment.property()
  public pickUp?: boolean;

  @Shipment.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Shipment.property({type: MerchiFile})
  public shipmentLabel?: MerchiFile | null;

  @Shipment.property({type: Date})
  public creationDate?: Date | null;

  @Shipment.property({type: Date})
  public dispatchedDate?: Date | null;

  @Shipment.property({type: Date})
  public dispatchDate?: Date | null;

  @Shipment.property({type: Date})
  public expectedReceiveDate?: Date | null;

  @Shipment.property({type: Date})
  public receivedDate?: Date | null;

  @Shipment.property()
  public senderResponsible?: boolean;

  @Shipment.property({type: String})
  public senderNotes?: string | null;

  @Shipment.property({type: String})
  public receiverNotes?: string | null;

  @Shipment.property({type: Number})
  public transportCompany?: number | null;

  @Shipment.property({type: String})
  public transportCompanyName?: string | null;

  @Shipment.property({type: String})
  public trackingNumber?: string | null;

  @Shipment.property({type: Number})
  public buyCost?: number | null;

  @Shipment.property({type: String})
  public buyCurrency?: string | null;

  @Shipment.property({type: Number})
  public cost?: number | null;

  @Shipment.property({type: Number})
  public taxAmount?: number | null;

  @Shipment.property({type: Number})
  public maxWeight?: number | null;

  @Shipment.property({type: Number})
  public maxVolume?: number | null;

  @Shipment.property()
  public sendSms?: boolean;

  @Shipment.property()
  public sendEmail?: boolean;

  @Shipment.property({type: CountryTax})
  public taxType?: CountryTax | null;

  @Shipment.property()
  public isOnBehalfOf?: boolean;

  @Shipment.property({type: User})
  public onBehalfOf?: User | null;

  @Shipment.property({type: Company})
  public onBehalfOfCompany?: Company | null;

  @Shipment.property({type: User})
  public sender?: User | null;

  @Shipment.property({type: Company})
  public senderCompany?: Company | null;

  @Shipment.property({type: Address})
  public senderAddress?: Address | null;

  @Shipment.property({type: String})
  public blindShipTo?: string | null;

  @Shipment.property({type: User})
  public receiver?: User | null;

  @Shipment.property({type: Company})
  public receiverCompany?: Company | null;

  @Shipment.property({type: Address})
  public receiverAddress?: Address | null;

  @Shipment.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @Shipment.property({type: Quote})
  public quote?: Quote | null;

  @Shipment.property({type: ShipmentMethod})
  public shipmentMethod?: ShipmentMethod | null;

  @Shipment.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  @Shipment.property({arrayType: 'Assignment'})
  public assignments?: Assignment[];

  @Shipment.property({arrayType: 'ShipmentItem'})
  public items?: ShipmentItem[];

  @Shipment.property({arrayType: 'Job'})
  public jobs?: Job[];

  public calculateSubTotal = (options?: CalculateOptions) => {
    const { strictEmbed = true } = options ? options : {};
    if (strictEmbed){
      if (this.cost === undefined) {
        throw new Error('cost is undefined, did you forget to embed it?');
      }
    }
    const cost = this.cost ? this.cost : 0;
    return parseFloat(String(cost)).toFixed(3);
  };

  public calculateTaxAmount = (options?: CalculateOptions) => {
    const taxPercent = this.taxType && this.taxType.taxPercent ?
      this.taxType.taxPercent : 0;
    const taxRate = taxPercent ? Number(taxPercent) / 100 : 0;
    return (parseFloat(
      this.calculateSubTotal(options)) * taxRate).toFixed(3);
  };

  public calculateTotal = (options?: CalculateOptions) => {
    return (
      parseFloat(this.calculateSubTotal(options)) +
      parseFloat(this.calculateTaxAmount(options))
    ).toFixed(3);
  };
}

// based on above model, generate a JSON version type
export type ShipmentJson = {
  id: number;
  archived: string | null;
  name: string;
  shipmentServiceBookingInfo: string;
  shipmentServiceQuote: string;
  pickUp: boolean;
  internalTags: InternalTag[];
  shipmentLabel: MerchiFileJson | null;
  creationDate: string | null;
  dispatchedDate: string | null;
  dispatchDate: string | null;
  expectedReceiveDate: string | null;
  receivedDate: string | null;
  senderResponsible: boolean;
  senderNotes: string | null;
  receiverNotes: string | null;
  transportCompany: number | null;
  transportCompanyName: string | null;
  trackingNumber: string | null;
  buyCost: number | null;
  buyCurrency: string | null;
  cost: number | null;
  taxAmount: number | null;
  maxWeight: number | null;
  maxVolume: number | null;
  sendSms: boolean;
  sendEmail: boolean;
  taxType: CountryTaxJson | null;
  isOnBehalfOf: boolean;
  onBehalfOf: UserJson | null;
  onBehalfOfCompany: CompanyJson | null;
  sender: UserJson | null;
  senderCompany: CompanyJson | null;
  senderAddress: AddressJson | null;
  blindShipTo: string | null;
  receiver: UserJson | null;
  receiverCompany: CompanyJson | null;
  receiverAddress: AddressJson | null;
  invoices: InvoiceJson[];
  quote: QuoteJson | null;
  shipmentMethod: ShipmentMethodJson | null;
  tags: DomainTagJson[];
  assignments: AssignmentJson[];
  items: ShipmentItemJson[];
  jobs: JobJson[];
}
