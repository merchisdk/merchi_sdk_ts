import { Entity } from '../entity.js';
import { User } from './user.js';

// Sentinel type for passthrough JSON columns (mirrors other entities). Must not
// be `Object`, which the property decorator rejects ("Bad attribute type").
const jsonPropertyType = class {};

export class ProductFormVersion extends Entity {
  protected static resourceName = 'product_form_versions';
  protected static singularName = 'productFormVersion';
  protected static pluralName = 'productFormVersions';

  @ProductFormVersion.property({type: Date})
  public created?: Date;

  @ProductFormVersion.property({type: Number})
  public id?: number;

  @ProductFormVersion.property({type: Number})
  public versionNumber?: number;

  @ProductFormVersion.property({type: String})
  public source?: string;

  @ProductFormVersion.property({type: String})
  public sdkVersion?: string;

  @ProductFormVersion.property({type: String})
  public compiledBundleUrl?: string | null;

  @ProductFormVersion.property({type: String})
  public bundleSha?: string | null;

  @ProductFormVersion.property({type: String})
  public compiledError?: string | null;

  @ProductFormVersion.property({type: jsonPropertyType})
  public staticGateReport?: any;

  @ProductFormVersion.property({type: String})
  public status?: string;

  @ProductFormVersion.property({type: Date})
  public approvedAt?: Date | null;

  @ProductFormVersion.property({type: 'User'})
  public approvedBy?: User | null;

  @ProductFormVersion.property({type: 'User'})
  public createdBy?: User | null;
}
