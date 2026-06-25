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

  @ProductForm.property({type: Number})
  public id?: number;

  @ProductForm.property({type: String})
  public name?: string;

  @ProductForm.property({type: String})
  public description?: string;

  @ProductForm.property()
  public tags?: string[];

  @ProductForm.property({type: String})
  public source?: string;

  @ProductForm.property({type: String})
  public sdkVersion?: string;

  @ProductForm.property({type: String})
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
