import { DraftPreviewLayer } from './draft_preview_layer.js';
import { Entity } from '../entity.js';
import { MerchiFile } from './file.js';
import { Job } from './job.js';
import { Product } from './product.js';
import { VariationField } from './variation_field.js';
import { VariationFieldsOption } from './variation_fields_option.js';

/**
 * Runtime type tag only. The API returns `customisationMap` as arbitrary JSON;
 * the entity layer refuses `Object` from decorator metadata, so we cannot use
 * `any` / plain object without an explicit `type` option here. A const class
 * expression is used so `noUnusedLocals` counts the symbol as used (a named
 * class referenced only from decorators can trigger TS6196).
 */
const customisationMapPropertyType = class {};

export class DraftTemplate extends Entity {
  protected static resourceName = 'draft_templates';
  protected static singularName = 'draftTemplate';
  protected static pluralName = 'draftTemplates';

  @DraftTemplate.property({type: Date})
  public archived?: Date | null;

  @DraftTemplate.property()
  public id?: number;

  @DraftTemplate.property({type: Date})
  public date?: Date | null;

  @DraftTemplate.property()
  public description?: string;

  @DraftTemplate.property()
  public name?: string;

  @DraftTemplate.property()
  public height?: number;

  @DraftTemplate.property()
  public width?: number;

  @DraftTemplate.property({type: MerchiFile})
  public file?: MerchiFile;

  @DraftTemplate.property({type: 'MerchiFile'})
  public design?: MerchiFile;

  @DraftTemplate.property({type: Product})
  public product?: Product | null;

  @DraftTemplate.property({type: Job})
  public job?: Job | null;

  @DraftTemplate.property({arrayType: 'VariationFieldsOption'})
  public selectedByVariationFieldOptions?: VariationFieldsOption[];

  @DraftTemplate.property({arrayType: 'VariationField'})
  public editedByVariationFields?: VariationField[];

  @DraftTemplate.property({arrayType: 'DraftPreviewLayer'})
  public draftPreviewLayers?: DraftPreviewLayer[];

  // Cached template customisation map -- which regions of the template
  // image are editable (text placeholders, body colour fill, print
  // area) versus preserved. Populated lazily by the backend when a
  // template is first rendered, or set manually by an operator (in
  // which case ``customisationMapSource === 'manual'`` and the auto
  // analyser leaves it alone). ``customisationMapFileId`` records the
  // ``file.id`` the cached map was generated from so the analyser
  // knows when to re-run after the template image is replaced.
  @DraftTemplate.property({type: customisationMapPropertyType})
  public customisationMap?: Record<string, unknown> | null;

  @DraftTemplate.property({type: String})
  public customisationMapSource?: string | null;

  @DraftTemplate.property({type: String})
  public customisationMapFileId?: string | null;
}
