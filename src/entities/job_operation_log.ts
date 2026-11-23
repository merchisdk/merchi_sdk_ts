import { Entity } from '../entity.js';
import type { Job } from './job.js';
import { User } from './user.js';

const jsonPropertyType = class {};

export class JobOperationLog extends Entity {
  protected static resourceName = 'job_operation_logs';
  protected static singularName = 'jobOperationLog';
  protected static pluralName = 'jobOperationLogs';

  @JobOperationLog.property({type: String})
  public id?: string;

  @JobOperationLog.property({type: 'Job'})
  public job?: Job | null;

  @JobOperationLog.property({type: User})
  public user?: User | null;

  @JobOperationLog.property({type: String})
  public sourceType?: string;

  @JobOperationLog.property({type: Boolean})
  public aiInvolved?: boolean;

  @JobOperationLog.property({type: String})
  public action?: string;

  @JobOperationLog.property({type: jsonPropertyType})
  public payloadJson?: Record<string, unknown> | null;

  @JobOperationLog.property({type: jsonPropertyType})
  public changesJson?: Record<string, unknown> | null;

  @JobOperationLog.property({type: jsonPropertyType})
  public operationJson?: Record<string, unknown> | null;

  @JobOperationLog.property({type: Date})
  public createdAt?: Date | null;
}
