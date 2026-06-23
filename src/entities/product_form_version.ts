import { Entity } from '../entity.js';
import { User } from './user.js';

export class ProductFormVersion extends Entity {
  protected static resourceName = 'product_form_versions';
  protected static singularName = 'productFormVersion';
  protected static pluralName = 'productFormVersions';

  @ProductFormVersion.property({type: Date})
  public created?: Date;

  @ProductFormVersion.property()
  public id?: number;

  @ProductFormVersion.property()
  public versionNumber?: number;

  @ProductFormVersion.property()
  public source?: string;

  @ProductFormVersion.property()
  public sdkVersion?: string;

  @ProductFormVersion.property()
  public compiledBundleUrl?: string | null;

  @ProductFormVersion.property()
  public bundleSha?: string | null;

  @ProductFormVersion.property()
  public compiledError?: string | null;

  @ProductFormVersion.property()
  public staticGateReport?: any;

  @ProductFormVersion.property()
  public status?: string;

  @ProductFormVersion.property({type: Date})
  public approvedAt?: Date | null;

  @ProductFormVersion.property({type: 'User'})
  public approvedBy?: User | null;

  @ProductFormVersion.property({type: 'User'})
  public createdBy?: User | null;
}
