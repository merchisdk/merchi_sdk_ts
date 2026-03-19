import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { User } from './user.js';
import { SupportMessage } from './support_message.js';

export class SupportConversation extends Entity {
  protected static resourceName = 'support_conversations';
  protected static singularName = 'supportConversation';
  protected static pluralName = 'supportConversations';

  @SupportConversation.property()
  public id?: number;

  @SupportConversation.property({ type: Date })
  public creationDate?: Date | null;

  @SupportConversation.property({ type: Date })
  public lastMessageAt?: Date | null;

  @SupportConversation.property()
  public domain?: Domain;

  @SupportConversation.property()
  public guestId?: string | null;

  @SupportConversation.property()
  public user?: User | null;

  @SupportConversation.property({ arrayType: 'SupportMessage' })
  public messages?: SupportMessage[];
}
