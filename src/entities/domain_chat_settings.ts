import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { MerchiFile } from './file.js';

export class DomainChatSettings extends Entity {
  protected static resourceName = 'domain_chat_settings';
  protected static singularName = 'domainChatSettings';
  protected static pluralName = 'domainChatSettingsList';

  @DomainChatSettings.property()
  public id?: number;

  @DomainChatSettings.property()
  public domain?: Domain;

  @DomainChatSettings.property()
  public enabled?: boolean;

  @DomainChatSettings.property()
  public displayName?: string | null;

  @DomainChatSettings.property({ type: MerchiFile })
  public avatar?: MerchiFile | null;

  @DomainChatSettings.property()
  public welcomeMessage?: string | null;

  @DomainChatSettings.property()
  public privacyPolicyUrl?: string | null;

  @DomainChatSettings.property({ type: Object })
  public workingHours?: any | null;

  @DomainChatSettings.property()
  public awayMessage?: string | null;

  @DomainChatSettings.property()
  public notifyEmailNewConversation?: boolean;

  @DomainChatSettings.property()
  public notifyEmailNewMessage?: boolean;

  @DomainChatSettings.property()
  public requireGuestContact?: boolean;
}
