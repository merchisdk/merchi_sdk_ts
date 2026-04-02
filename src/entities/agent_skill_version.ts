import { Entity } from '../entity.js';
import { RequestOptions } from '../request.js';

export class AgentSkillVersion extends Entity {
  protected static resourceName = 'agent_skill_versions';
  protected static singularName = 'agentSkillVersion';
  protected static pluralName = 'agentSkillVersions';

  @AgentSkillVersion.property()
  public id?: string;

  @AgentSkillVersion.property()
  public skillId?: string;

  @AgentSkillVersion.property()
  public versionNumber?: number;

  @AgentSkillVersion.property()
  public contentMd?: string;

  @AgentSkillVersion.property()
  public contentHash?: string;

  @AgentSkillVersion.property()
  public status?: string;

  @AgentSkillVersion.property({ type: Date })
  public requestedAt?: Date | null;

  @AgentSkillVersion.property({ type: Date })
  public publishedAt?: Date | null;

  @AgentSkillVersion.property({ type: Date })
  public disabledAt?: Date | null;

  public submit = (skillId: string) => {
    const resource = `/agent_skills/${skillId}/versions/${this.id}/submit/`;
    const fetchOptions: RequestOptions = { method: 'POST' };
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      this.fromJson(data.agentSkillVersion);
      return this;
    });
  };

  public approve = (skillId: string, comment: string) => {
    const resource = `/agent_skills/${skillId}/versions/${this.id}/approve/`;
    const fetchOptions: RequestOptions = { method: 'POST', body: new FormData() };
    (fetchOptions.body as FormData).set('comment', comment);
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      this.fromJson(data.agentSkillVersion);
      return this;
    });
  };

  public reject = (skillId: string, comment: string) => {
    const resource = `/agent_skills/${skillId}/versions/${this.id}/reject/`;
    const fetchOptions: RequestOptions = { method: 'POST', body: new FormData() };
    (fetchOptions.body as FormData).set('comment', comment);
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      this.fromJson(data.agentSkillVersion);
      return this;
    });
  };
}
