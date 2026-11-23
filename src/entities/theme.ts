import { Domain } from './domain.js';
import { Entity } from '../entity.js';
import { User } from './user.js';
import { ThemeStatus } from '../constants/theme_status.js';

export class Theme extends Entity {
  protected static resourceName = 'themes';
  protected static singularName = 'theme';
  protected static pluralName = 'themes';

  @Theme.property({type: Date})
  public archived?: Date | null;

  @Theme.property()
  public id?: number;

  @Theme.property()
  public mainCssStatus?: number;

  @Theme.property({type: String})
  public mainCssErrorMessage?: string | null;

  @Theme.property()
  public emailCssStatus?: number;

  @Theme.property({type: String})
  public emailCssErrorMessage?: string | null;

  @Theme.property()
  public lastUpdated?: Date;

  @Theme.property({embeddedByDefault: false, type: String})
  public mainCss?: string | null;

  @Theme.property({embeddedByDefault: false, type: String})
  public mainCssTemplateUsing?: string | null;

  @Theme.property({embeddedByDefault: false, type: String})
  public mainCssTemplateEditing?: string | null;

  @Theme.property({embeddedByDefault: false, type: String})
  public emailCss?: string | null;

  @Theme.property({embeddedByDefault: false, type: String})
  public emailCssTemplateUsing?: string | null;

  @Theme.property({embeddedByDefault: false, type: String})
  public emailCssTemplateEditing?: string | null;

  @Theme.property({type: 'Domain'})
  public domain?: Domain | null;

  @Theme.property({type: User})
  public author?: User | null;

  @Theme.property({arrayType: 'Domain'})
  public domains?: Domain[];

  public canBeActivated = () => {
    const validStatus = ThemeStatus.VALID_BUT_NOT_UPDATED;
    if (this.mainCssStatus === undefined || this.emailCssStatus === undefined) {
      throw new Error('status is unknown');
    }
    return this.mainCssStatus >= validStatus &&
      this.emailCssStatus >= validStatus;
  };

  public isActiveOnDomain = (domainId: number) => {
    const domain = this.domain;
    if (domain === undefined) {
      throw new Error('domain is unknown');
    }
    if (domain === null) {
      return false;
    }
    const activeTheme = domain.activeTheme;
    if (activeTheme === undefined) {
      throw new Error('activeTheme is unknown');
    }
    return domain.id == domainId && activeTheme.id === this.id;
  };
}
