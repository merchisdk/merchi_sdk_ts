import { Entity } from '../entity.js';
import { MerchiFile } from './file.js';
import { Job } from './job.js';
import { Product } from './product.js';

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
