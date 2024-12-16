import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { Job, JobJson } from './job.js';
import { Product, ProductJson } from './product.js';

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

  @DraftTemplate.property({type: Product})
  public product?: Product | null;

  @DraftTemplate.property({type: Job})
  public job?: Job | null;
}


// based on above model, generate a JSON version type
export type DraftTemplateJson = {
  id: number;
  archived: string | null;
  date: string | null;
  description: string;
  name: string;
  height: number;
  width: number;
  file: MerchiFileJson;
  product: ProductJson | null;
  job: JobJson | null;
}
