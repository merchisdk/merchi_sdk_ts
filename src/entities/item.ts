import { Entity } from '../entity.js';
import { Cart, CartJson } from './cart.js';
import { Discount, DiscountJson } from './discount.js';
import { Invoice, InvoiceJson } from './invoice.js';
import { Job, JobJson } from './job.js';
import { CountryTax, CountryTaxJson } from './country_tax.js';

export class Item extends Entity {
  protected static resourceName = 'items';
  protected static singularName = 'item';
  protected static pluralName = 'items';

  @Item.property({type: Date})
  public archived?: Date | null;

  @Item.property()
  public code?: string;

  @Item.property()
  public id?: number;

  @Item.property({type: Number})
  public quantity?: number | null;

  @Item.property()
  public description?: string;

  @Item.property()
  public cost?: number;

  @Item.property({type: Number})
  public taxAmount?: number | null;

  @Item.property({type: "Cart"})
  public cart?: Cart | null;

  @Item.property({type: "Discount"})
  public discount?: Discount | null;

  @Item.property({type: "Invoice"})
  public invoice?: Invoice | null;

  @Item.property({type: "Job"})
  public job?: Job | null;

  @Item.property({type: CountryTax})
  public taxType?: CountryTax | null;

  public totalCost = () => {
    if (this.quantity === undefined) {
      throw 'quantity is undefined, did you forget to embed it?';
    }
    if (this.cost === undefined) {
      throw 'cost is undefined, did you forget to embed it?';
    }
    const quantity = this.quantity === null ? 0 : this.quantity;
    return quantity * this.cost;
  };
}


// Json version type
export type ItemJson = {
  archived: string | null;
  code: string;
  id: number;
  quantity: number | null;
  description: string;
  cost: number;
  taxAmount: number | null;
  cart: CartJson | null;
  discount: DiscountJson | null;
  invoice: InvoiceJson | null;
  job: JobJson | null;
  taxType: CountryTaxJson | null;
}
