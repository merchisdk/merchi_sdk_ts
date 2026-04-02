import { Entity } from '../entity.js';
import { RequestOptions } from '../request.js';
import { AgentSkillVersion } from './agent_skill_version.js';

interface CreateDraftOptions {
  contentMd?: string;
}

export class AgentSkill extends Entity {
  protected static resourceName = 'agent_skills';
  protected static singularName = 'agentSkill';
  protected static pluralName = 'agentSkills';
  protected static primaryKey = 'id';

  @AgentSkill.property()
  public id?: string;

  @AgentSkill.property()
  public slug?: string;

  @AgentSkill.property()
  public title?: string;

  @AgentSkill.property()
  public description?: string | null;

  @AgentSkill.property()
  public priority?: number;

  @AgentSkill.property({ type: Date })
  public createdAt?: Date | null;

  @AgentSkill.property({ type: Date })
  public disabledAt?: Date | null;

  @AgentSkill.property()
  public currentDraftVersionId?: string | null;

  @AgentSkill.property()
  public currentPublishedVersionId?: string | null;

  @AgentSkill.property({ arrayType: 'AgentSkillVersion' })
  public versions?: AgentSkillVersion[];

  public createDraftVersion = (options?: CreateDraftOptions) => {
    const resource = `/agent_skills/${this.id}/versions/`;
    const fetchOptions: RequestOptions = { method: 'POST' };
    if (options && options.contentMd) {
      const body = new FormData();
      body.set('contentMd', options.contentMd);
      fetchOptions.body = body;
    }
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      const version = new this.merchi.AgentSkillVersion();
      version.fromJson(data.agentSkillVersion);
      this.currentDraftVersionId = version.id;
      return version;
    });
  };

  public disable = () => {
    const resource = `/agent_skills/${this.id}/disable/`;
    const fetchOptions: RequestOptions = { method: 'POST' };
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      this.fromJson(data.agentSkill);
      return this;
    });
  };

  public enable = () => {
    const resource = `/agent_skills/${this.id}/enable/`;
    const fetchOptions: RequestOptions = { method: 'POST' };
    return this.merchi.authenticatedFetch(resource, fetchOptions).then((data: any) => {
      this.fromJson(data.agentSkill);
      return this;
    });
  };

  public getVersionDiff = (versionId: string) => {
    const resource = `/agent_skills/${this.id}/versions/${versionId}/diff/`;
    const fetchOptions: RequestOptions = { method: 'GET' };
    return this.merchi.authenticatedFetch(resource, fetchOptions);
  };
}
