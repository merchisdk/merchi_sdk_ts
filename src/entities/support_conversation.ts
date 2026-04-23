import { Domain } from './domain.js';
import { DomainTag } from './domain_tag.js';
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

  @SupportConversation.property({ type: Date })
  public archivedAt?: Date | null;

  @SupportConversation.property({ type: Domain })
  public domain?: Domain;

  @SupportConversation.property({ arrayType: 'DomainTag' })
  public tags?: DomainTag[];

  @SupportConversation.property({ type: String })
  public guestId?: string | null;

  @SupportConversation.property({ type: String })
  public guestContactEmail?: string | null;

  @SupportConversation.property({ type: String })
  public guestContactName?: string | null;

  /** Opaque client fingerprint for repeat-visitor / spam correlation (max 512 chars). */
  @SupportConversation.property({ type: String })
  public clientFingerprint?: string | null;

  /** Manager-assigned display name for this conversation. */
  @SupportConversation.property({ type: String })
  public name?: string | null;

  /** Freeform internal notes written by managers (not visible to guests). */
  @SupportConversation.property({ type: String })
  public notes?: string | null;

  @SupportConversation.property({ type: User })
  public user?: User | null;

  @SupportConversation.property({ type: User })
  public assignedUser?: User | null;

  @SupportConversation.property({ type: Boolean })
  public aiAutoReply?: boolean;

  @SupportConversation.property({ arrayType: 'SupportMessage' })
  public messages?: SupportMessage[];

  @SupportConversation.property()
  public messagesCount?: number;
}
