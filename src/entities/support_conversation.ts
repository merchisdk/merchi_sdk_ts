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

  @SupportConversation.property({ type: Domain })
  public domain?: Domain;

  @SupportConversation.property({ type: String })
  public guestId?: string | null;

  /** Opaque client fingerprint for repeat-visitor / spam correlation (max 512 chars). */
  @SupportConversation.property({ type: String })
  public clientFingerprint?: string | null;

  @SupportConversation.property({ type: User })
  public user?: User | null;

  @SupportConversation.property({ arrayType: 'SupportMessage' })
  public messages?: SupportMessage[];
}
