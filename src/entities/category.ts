import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { Product } from './product.js';
import { User } from './user.js';

export class Category extends Entity {
  protected static resourceName = 'categories';
  protected static singularName = 'category';
  protected static pluralName = 'categories';

  @Category.property({type: Date})
  public archived?: Date | null;

  @Category.property()
  public id?: number;

  @Category.property()
  public name?: string;

  @Category.property()
  public showDashboard?: boolean;

  @Category.property()
  public showPublic?: boolean;

  @Category.property()
  public showPublicSupplierResell?: boolean;

  @Category.property()
  public domain?: Domain;

  @Category.property({arrayType: 'Product'})
  public products?: Product[];

  @Category.property({arrayType: 'User'})
  public users?: User[];

  @Category.property({arrayType: 'Category'})
  public subCategories?: Category[];

  @Category.property({arrayType: 'Category'})
  public parent?: Category[];
}
