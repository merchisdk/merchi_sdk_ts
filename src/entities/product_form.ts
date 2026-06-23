import { Entity } from '../entity.js';
import { ProductFormVersion } from './product_form_version.js';
import { User } from './user.js';

export class ProductForm extends Entity {
  protected static resourceName = 'product_forms';
  protected static singularName = 'productForm';
  protected static pluralName = 'productForms';

  @ProductForm.property({type: Date})
  public archived?: Date | null;

  @ProductForm.property({type: Date})
  public created?: Date;

  @ProductForm.property({type: Date})
  public updated?: Date;

  @ProductForm.property()
  public id?: number;

  @ProductForm.property()
  public name?: string;

  @ProductForm.property()
  public description?: string;

  @ProductForm.property()
  public tags?: string[];

  @ProductForm.property()
  public source?: string;

  @ProductForm.property()
  public sdkVersion?: string;

  @ProductForm.property()
  public status?: string;

  @ProductForm.property({type: 'ProductFormVersion'})
  public activeVersion?: ProductFormVersion | null;

  @ProductForm.property({arrayType: 'ProductFormVersion'})
  public versions?: ProductFormVersion[];

  @ProductForm.property({type: 'User'})
  public createdBy?: User | null;

  @ProductForm.property({type: 'User'})
  public updatedBy?: User | null;
}
