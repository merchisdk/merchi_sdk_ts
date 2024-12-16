import { Entity } from '../entity.js';
import { Notification, NotificationJson } from './notification.js';
import { User, UserJson } from './user.js';

export class ShortUrl extends Entity {
  protected static resourceName = 'short_urls';
  protected static singularName = 'shortUrl';
  protected static pluralName = 'shortUrls';

  @ShortUrl.property({type: Date})
  public archived?: Date | null;

  @ShortUrl.property()
  public id?: number;

  @ShortUrl.property()
  public prefixToken?: string;

  @ShortUrl.property()
  public suffixToken?: string;

  @ShortUrl.property()
  public originalLink?: string;

  @ShortUrl.property()
  public triedTimes?: number;

  @ShortUrl.property({type: Date})
  public lastLookup?: Date | null;

  @ShortUrl.property({type: User})
  public user?: User | null;

  @ShortUrl.property({arrayType: 'Notification'})
  public notification?: Notification[];
}


// based on model, generate coresponding JSON type
export type ShortUrlJson = {
  archived?: string | null;
  id?: number;
  prefixToken?: string;
  suffixToken?: string;
  originalLink?: string;
  triedTimes?: number;
  lastLookup?: string | null;
  user?: UserJson | null;
  notification?: NotificationJson[];
}
