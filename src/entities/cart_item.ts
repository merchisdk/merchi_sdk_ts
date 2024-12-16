import { Entity } from '../entity.js';
import { Product, ProductJson } from './product.js';
import { RequestOptions } from '../request.js';
import { Cart, CartJson } from './cart.js';
import { CountryTax, CountryTaxJson } from './country_tax.js';
import { Variation, VariationJson } from './variation.js';
import { VariationsGroup, VariationsGroupJson } from './variations_group.js';
import { DomainTag, DomainTagJson } from './domain_tag.js';

export class CartItem extends Entity {
  protected static resourceName = 'cart_items';
  protected static singularName = 'cartItem';
  protected static pluralName = 'cartItems';

  @CartItem.property({type: Date})
  public archived?: Date | null;

  @CartItem.property()
  public id?: number;

  @CartItem.property()
  public quantity?: number;

  @CartItem.property({type: String})
  public notes?: string | null;

  @CartItem.property()
  public creationDate?: Date;

  @CartItem.property()
  public currency?: string;

  @CartItem.property()
  public subtotalCost?: number;

  @CartItem.property()
  public taxAmount?: number;

  @CartItem.property()
  public totalCost?: number;

  @CartItem.property()
  public product?: Product;

  @CartItem.property()
  public cart?: Cart;

  @CartItem.property({embeddedByDefault: false})
  public taxType?: CountryTax;

  @CartItem.property({arrayType: 'VariationsGroup'})
  public variationsGroups?: VariationsGroup[];

  @CartItem.property({arrayType: 'Variation'})
  public variations?: Variation[];

  @CartItem.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  public requiresShipment = () => {
    if (this.product === undefined) {
      throw 'product is undefined, did you forget to embed it?';
    }
    if (this.product.needsShipping === undefined) {
      throw 'needsShipping is undefined, did you forget to embed it?';
    }
    return this.product.needsShipping;
  };

  public calculate = () => {
    const resource = '/cart-item-cost-estimate/';
    const data = this.toFormData({excludeOld: false});
    const fetchOptions: RequestOptions = {method: 'POST', body: data};
    fetchOptions.query = [];
    fetchOptions.query.push(['skip_rights', 'y']);

    return this.merchi.authenticatedFetch(resource, fetchOptions).
      then((data: any) => { this.fromJson(data, {makeDirty: true});
        return this;});
  };
}

// based on above model, generate a JSON version type
export type CartItemJson = {
  id: number;
  archived: string | null;
  quantity: number;
  notes: string | null;
  creationDate: string;
  currency: string;
  subtotalCost: number;
  taxAmount: number;
  totalCost: number;
  product: ProductJson;
  cart: CartJson;
  taxType: CountryTaxJson;
  variationsGroups: VariationsGroupJson[];
  variations: VariationJson[];
  tags: DomainTagJson[];
}
