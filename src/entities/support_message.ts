import { Entity } from '../entity.js';
import { SupportConversation } from './support_conversation.js';
import { User } from './user.js';

export class SupportMessage extends Entity {
  protected static resourceName = 'support_messages';
  protected static singularName = 'supportMessage';
  protected static pluralName = 'supportMessages';

  @SupportMessage.property()
  public id?: number;

  @SupportMessage.property({ type: SupportConversation })
  public conversation?: SupportConversation;

  @SupportMessage.property({ type: String })
  public senderType?: string;  // 'guest' | 'manager'

  @SupportMessage.property({ type: User })
  public user?: User | null;

  @SupportMessage.property({ type: String })
  public content?: string;

  @SupportMessage.property({ type: Date })
  public creationDate?: Date | null;
}
