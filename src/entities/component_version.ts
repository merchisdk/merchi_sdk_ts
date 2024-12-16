import { Component, ComponentJson } from './component.js';
import { Entity } from '../entity.js';

export class ComponentVersion extends Entity {
  protected static resourceName = 'component_versions';
  protected static singularName = 'componentVersion';
  protected static pluralName = 'componentVersions';

  @ComponentVersion.property({type: Date})
  public archived?: Date | null;

  @ComponentVersion.property({type: Date})
  public created?: Date | null;

  @ComponentVersion.property()
  public id?: number;

  @ComponentVersion.property()
  public body?: string;

  @ComponentVersion.property()
  public description?: string;

  @ComponentVersion.property()
  public isClassBased?: boolean;

  @ComponentVersion.property({type: 'Component'})
  public component?: Component;

}

// based on above model, generate a JSON version type
export type ComponentVersionJson = {
  id: number;
  archived: string | null;
  created: string | null;
  body: string;
  description: string;
  isClassBased: boolean;
  component: ComponentJson;
}
