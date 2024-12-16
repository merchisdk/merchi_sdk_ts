import { ComponentTag, ComponentTagJson } from './component_tag.js';
import { ComponentVersion, ComponentVersionJson } from './component_version.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { User } from './user.js';

export class Component extends Entity {
  protected static resourceName = 'components';
  protected static singularName = 'component';
  protected static pluralName = 'components';

  @Component.property({type: Date})
  public archived?: Date | null;

  @Component.property({type: Date})
  public created?: Date;

  @Component.property({type: Date})
  public updated?: Date;

  @Component.property()
  public id?: number;

  @Component.property()
  public isClassBased?: boolean;

  @Component.property()
  public outOfSyncWithOriginal?: boolean;

  @Component.property()
  public needsUpdate?: boolean;

  @Component.property()
  public hasImports?: number;

  @Component.property()
  public isClone?: boolean;

  @Component.property()
  public warnings?: boolean;

  @Component.property()
  public name?: string;

  @Component.property()
  public body?: string;

  @Component.property()
  public description?: string;

  @Component.property()
  public compiled?: string;

  @Component.property({type: 'Component'})
  public componentExport?: Component;

  @Component.property({arrayType: 'Component'})
  public componentExports?: Component[];

  @Component.property({arrayType: 'Component'})
  public componentImports?: Component[];

  @Component.property({type: 'Component'})
  public originalComponent?: Component;

  @Component.property({arrayType: 'MerchiFile'})
  public images?: MerchiFile[];

  @Component.property({type: MerchiFile})
  public featureImage?: MerchiFile | null;

  @Component.property({arrayType: 'ComponentTag'})
  public tags?: ComponentTag[];

  @Component.property({type: 'User'})
  public createdBy?: User | null;

  @Component.property({type: 'User'})
  public updatedBy?: User | null;

  @Component.property({arrayType: 'ComponentVersion'})
  public versions?: ComponentVersion[];

  public toReact = (context: any) => {
    const componentCode = 'with (this) { ' + this.compiled + ' return ' +
      this.name + ';}';
    const proxy = new Proxy(context, {});
    const callable = new Function(componentCode);
    return callable.call(proxy);
  };

}

// based on above model, generate a JSON version type
export type ComponentJson = {
  id: number;
  archived: string | null;
  created: string;
  updated: string;
  isClassBased: boolean;
  outOfSyncWithOriginal: boolean;
  needsUpdate: boolean;
  hasImports: number;
  isClone: boolean;
  warnings: boolean;
  name: string;
  body: string;
  description: string;
  compiled: string;
  componentExport: ComponentJson;
  componentExports: ComponentJson[];
  componentImports: ComponentJson[];
  originalComponent: ComponentJson;
  images: MerchiFileJson[];
  featureImage: MerchiFileJson | null;
  tags: ComponentTagJson[];
  createdBy: User | null;
  updatedBy: User | null;
  versions: ComponentVersionJson[];
}
