import { Component, ComponentJson } from './component.js';
import { Entity } from '../entity.js';

export class ComponentTag extends Entity {
  protected static resourceName = 'component_tags';
  protected static singularName = 'componentTag';
  protected static pluralName = 'componentTags';

  @ComponentTag.property()
  public id?: number;

  @ComponentTag.property()
  public name?: string;

  @ComponentTag.property()
  public component?: Component;
}

// based on above model, generate a JSON version type
export type ComponentTagJson = {
  id: number;
  name: string;
  component: ComponentJson;
}
