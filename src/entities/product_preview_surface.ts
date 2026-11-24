import type { DraftTemplate } from './draft_template.js';
import { Entity } from '../entity.js';
import type { ProductPreviewModel } from './product_preview_model.js';

export class ProductPreviewSurface extends Entity {
  protected static resourceName = 'product_preview_surfaces';
  protected static singularName = 'productPreviewSurface';
  protected static pluralName = 'previewSurfaces';

  @ProductPreviewSurface.property()
  public id?: number;

  @ProductPreviewSurface.property({type: String})
  public materialName?: string;

  @ProductPreviewSurface.property({type: String})
  public role?: string;

  @ProductPreviewSurface.property({type: Number})
  public regionIndex?: number;

  @ProductPreviewSurface.property({type: 'ProductPreviewModel'})
  public previewModel?: ProductPreviewModel;

  @ProductPreviewSurface.property({type: 'DraftTemplate'})
  public draftTemplate?: DraftTemplate | null;
}
