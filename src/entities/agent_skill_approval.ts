import { Entity } from '../entity.js';
import { User } from './user.js';

export class AgentSkillApproval extends Entity {
  protected static resourceName = 'agent_skill_approvals';
  protected static singularName = 'agentSkillApproval';
  protected static pluralName = 'agentSkillApprovals';

  @AgentSkillApproval.property()
  public id?: string;

  @AgentSkillApproval.property()
  public skillVersionId?: string;

  @AgentSkillApproval.property({ type: User })
  public superUser?: User | null;

  @AgentSkillApproval.property()
  public decision?: 'approved' | 'rejected';

  @AgentSkillApproval.property()
  public comment?: string | null;

  @AgentSkillApproval.property({ type: Date })
  public createdAt?: Date | null;
}
