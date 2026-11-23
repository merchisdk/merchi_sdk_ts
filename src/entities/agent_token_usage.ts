import { Entity } from '../entity.js';
import { Company } from './company.js';
import { Domain } from './domain.js';
import { User } from './user.js';
import { AgentConversation } from './agent_conversation.js';
import { SupportConversation } from './support_conversation.js';
import type {
  AgentTokenUsageRecordPayload,
  AgentTokenUsageRecordResponse,
} from './agent_token_analytics.js';
import type { RequestOptions } from '../request.js';

export class AgentTokenUsage extends Entity {
  protected static resourceName = 'agent_token_usage';
  protected static singularName = 'agentTokenUsage';
  protected static pluralName = 'agentTokenUsage';

  @AgentTokenUsage.property()
  public id?: number;

  @AgentTokenUsage.property({type: Date})
  public createdAt?: Date | null;

  @AgentTokenUsage.property()
  public companyId?: number;

  @AgentTokenUsage.property()
  public domainId?: number;

  @AgentTokenUsage.property()
  public userId?: number;

  @AgentTokenUsage.property({type: Company})
  public company?: Company | null;

  @AgentTokenUsage.property({type: Domain})
  public domain?: Domain | null;

  @AgentTokenUsage.property({type: User})
  public user?: User | null;

  @AgentTokenUsage.property({type: AgentConversation})
  public agentConversation?: AgentConversation | null;

  @AgentTokenUsage.property({type: SupportConversation})
  public supportConversation?: SupportConversation | null;

  @AgentTokenUsage.property()
  public agentConversationId?: number;

  @AgentTokenUsage.property()
  public supportConversationId?: number;

  @AgentTokenUsage.property()
  public sourceType?: string;

  @AgentTokenUsage.property()
  public modelName?: string;

  @AgentTokenUsage.property()
  public promptTokens?: number;

  @AgentTokenUsage.property()
  public completionTokens?: number;

  @AgentTokenUsage.property()
  public totalTokens?: number;

  public static record = (
    payload: AgentTokenUsageRecordPayload,
    fetchOptions?: RequestOptions
  ): Promise<AgentTokenUsageRecordResponse> => {
    const Constructor = this as typeof AgentTokenUsage;
    const fetchOpts: RequestOptions = {
      ...(fetchOptions || {}),
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        ...(fetchOptions?.headers || {}),
        'Content-Type': 'application/json',
      },
    };
    return Constructor.merchi.authenticatedFetch(
      '/agent_token_usage/',
      fetchOpts
    ) as Promise<AgentTokenUsageRecordResponse>;
  };
}
