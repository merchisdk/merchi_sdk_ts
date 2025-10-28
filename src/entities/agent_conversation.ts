import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { User } from './user.js';

export class AgentConversation extends Entity {
  protected static resourceName = 'agent_conversations';
  protected static singularName = 'agentConversation';
  protected static pluralName = 'agentConversations';

  @AgentConversation.property({type: Date})
  public archived?: Date | null;

  @AgentConversation.property()
  public id?: number;

  @AgentConversation.property()
  public conversationId?: string;

  @AgentConversation.property()
  public initialPrompt?: string;

  @AgentConversation.property({type: Date})
  public creationDate?: Date | null;

  @AgentConversation.property()
  public serviceProvider?: number;

  @AgentConversation.property()
  public user?: User;

  @AgentConversation.property()
  public domain?: Domain;
}
