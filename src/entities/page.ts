import { Entity } from '../entity.js';
import { Theme, ThemeJson } from './theme.js';

export class Page extends Entity {
  protected static resourceName = 'pages';
  protected static singularName = 'page';
  protected static pluralName = 'themes';

  @Page.property()
  public id?: number;

  @Page.property()
  public name?: string;

  @Page.property()
  public slug?: string;

  @Page.property()
  public template?: string;

  @Page.property()
  public js?: string;

  @Page.property()
  public html?: string;

  @Page.property({type: String})
  public error?: string | null;

  @Page.property({type: 'Theme'})
  public theme?: Theme;
}

export type PageJson = {
  id?: number;
  name?: string;
  slug?: string;
  template?: string;
  js?: string;
  html?: string;
  error?: string | null;
  theme?: ThemeJson;
};
