import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';

export class Backup extends Entity {
  protected static resourceName = 'backups';
  protected static singularName = 'backup';
  protected static pluralName = 'backups';

  @Backup.property()
  public id?: number;

  @Backup.property()
  public file?: MerchiFile;
}

// based on above model, generate a JSON version type
export type BackupJson = {
  id: number;
  file: MerchiFileJson;
}
