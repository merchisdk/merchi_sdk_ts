import { Entity } from '../entity.js';
import { Domain, DomainJson } from './domain.js';
import { Product, ProductJson } from './product.js';
import { Discount, DiscountJson } from './discount.js';

export class DiscountGroup extends Entity {
  protected static resourceName = 'discount_groups';
  protected static singularName = 'discountGroup';
  protected static pluralName = 'discountGroups';

  @DiscountGroup.property({type: Date})
  public archived?: Date | null;

  @DiscountGroup.property({type: Date})
  public created?: Date | null;

  @DiscountGroup.property()
  public id?: number;

  @DiscountGroup.property({type: Date})
  public dateStart?: Date | null;

  @DiscountGroup.property({type: Date})
  public dateEnd?: Date | null;

  @DiscountGroup.property()
  public discountType?: number;

  @DiscountGroup.property({arrayType: 'Discount'})
  public discounts?: Discount[];

  @DiscountGroup.property()
  public name?: string;

  @DiscountGroup.property({type: 'Product'})
  public product?: Product | null;

  @DiscountGroup.property({type: 'Domain'})
  public domain?: Domain | null;
}

// based on above model, generate a JSON version type
export type DiscountGroupJson = {
  archived: string | null;
  created: string | null;
  id: number;
  dateStart: string | null;
  dateEnd: string | null;
  discountType: number;
  discounts: DiscountJson[];
  name: string;
  product: ProductJson | null;
  domain: DomainJson | null;
}
