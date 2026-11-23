import { Entity } from '../entity.js';
import type { MerchiFile } from './file.js';
import type { Product } from './product.js';
import type { ProductPreviewSurface } from './product_preview_surface.js';

export class ProductPreviewModel extends Entity {
  protected static resourceName = 'product_preview_models';
  protected static singularName = 'productPreviewModel';
  protected static pluralName = 'previewModels';

  @ProductPreviewModel.property()
  public id?: number;

  @ProductPreviewModel.property({type: String})
  public name?: string | null;

  @ProductPreviewModel.property({type: 'MerchiFile'})
  public file?: MerchiFile;

  @ProductPreviewModel.property({type: 'Product'})
  public product?: Product;

  @ProductPreviewModel.property({arrayType: 'ProductPreviewSurface'})
  public previewSurfaces?: ProductPreviewSurface[];
}
