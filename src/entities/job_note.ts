import { Entity } from '../entity.js';
import { MerchiFile } from './file.js';
import { Job } from './job.js';
import { User } from './user.js';

export class JobNote extends Entity {
  protected static resourceName = 'job_notes';
  protected static singularName = 'jobNote';
  protected static pluralName = 'jobNotes';

  @JobNote.property({type: Date})
  public archived?: Date | null;

  @JobNote.property()
  public id?: number;

  @JobNote.property()
  public noteType?: number;

  @JobNote.property()
  public richText?: string;

  @JobNote.property({type: Date})
  public creationDate?: Date | null;

  @JobNote.property({type: Date})
  public lastEditedTime?: Date | null;

  @JobNote.property({arrayType: 'MerchiFile'})
  public files?: MerchiFile[];

  @JobNote.property()
  public job?: Job;

  @JobNote.property()
  public createdBy?: User;

  @JobNote.property()
  public lastEditedBy?: User;
}
