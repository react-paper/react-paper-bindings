import Reconciler from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import paper from 'paper/dist/paper-core';

import * as Item from './Items';

type Container = paper.PaperScope;

type Instance =
  | paper.View
  | paper.Tool
  | paper.Layer
  | paper.Group
  | paper.Path
  | paper.CompoundPath
  | paper.SymbolItem
  | paper.PointText
  | paper.Raster;

type Type = keyof typeof Item;

type Index<T> = { [key: string]: T };
type Props = Index<any>;

type ApplyDefaultProp = (
  prop: string,
  instance: Instance,
  props: Props,
  prev: Props
) => void;

type ApplyProp = (instance: Instance, props: Props, prev: Props) => void;

const applyDefaultProp: ApplyDefaultProp = (prop, instance, props, prev) => {
  if (props[prop] !== prev[prop]) {
    Object.assign(instance, { [prop]: props[prop] });
  }
};

const applyProp: Index<ApplyProp> = {
  data: (instance, props, prev) => {
    if (props.data !== prev.data && instance instanceof paper.Item) {
      instance.data = {
        ...instance.data,
        ...props.data,
        type: instance.type,
      };
    }
  },
  active: (instance, props, prev) => {
    if (
      props.active &&
      props.active !== prev.active &&
      instance instanceof paper.Tool
    ) {
      instance.activate();
    }
  },
  point: (instance, props, prev) => {
    if (props.point !== prev.point && instance instanceof paper.Item) {
      instance.translate([
        props.point[0] - prev.point[0],
        props.point[1] - prev.point[1],
      ]);
    }
  },
  center: (instance, props, prev) => {
    if (props.center !== prev.center && instance instanceof paper.Item) {
      instance.translate([
        props.center[0] - prev.center[0],
        props.center[1] - prev.center[1],
      ]);
    }
  },
  radius: (instance, props, prev) => {
    if (props.radius !== prev.radius && instance instanceof paper.Item) {
      instance.scale(props.radius / prev.radius);
    }
  },
  rotation: (instance, props, prev) => {
    if (props.rotation !== prev.rotation && instance instanceof paper.Item) {
      if (props.rotation && prev.rotation) {
        instance.rotate(props.rotation - prev.rotation);
      } else {
        instance.rotation = props.rotation;
      }
    }
  },
  size: (instance, props, prev) => {
    if (props.size !== prev.size && instance instanceof paper.Item) {
      instance.scale(
        props.size[0] / prev.size[0],
        props.size[1] / prev.size[1]
      );
    }
  },
};

const applyProps = (
  instance: Instance,
  props: Props,
  prevProps: Props = {}
) => {
  const keys = Object.keys(props);
  const len = keys.length;
  let i = 0;
  // https://stackoverflow.com/a/7252102
  while (i < len) {
    const prop = keys[i];
    if (prop !== 'id' && prop !== 'children') {
      if (applyProp[prop]) {
        applyProp[prop](instance, props, prevProps);
      } else {
        applyDefaultProp(prop, instance, props, prevProps);
      }
    }
    i++;
  }
};

const getSymbolDefinition = (scope: Container, { id, name, svg }: Props) => {
  const key = id || name;
  if (!key) throw new Error('Missing id or name prop on SymbolItem');
  if (!svg) throw new Error('Missing svg prop on SymbolItem');

  // return cached definition
  if (scope.symbols && scope.symbols[key]) {
    return scope.symbols[key];
  }

  // create symbols cache
  if (!scope.symbols) {
    scope.symbols = {};
  }

  // create definition
  const definition = new paper.SymbolDefinition(scope.project.importSVG(svg));
  scope.symbols[key] = definition;

  // return created definition
  return definition;
};

export const Renderer = Reconciler({
  createInstance: (type: Type, instanceProps: Props, scope: Container) => {
    const { children, ...other } = instanceProps;
    const props: Props = { ...other, project: scope.project };

    let instance: Instance;

    switch (type) {
      case Item.View:
        instance = scope.view;
        instance.project = scope.project;
        break;
      case Item.Tool:
        instance = new scope.Tool();
        break;
      case Item.Layer:
        instance = new scope.Layer(props);
        break;
      case Item.Group:
        instance = new scope.Group(props);
        break;
      case Item.Path:
        instance = new scope.Path(props);
        break;
      case Item.CompoundPath:
        instance = new scope.CompoundPath(props);
        break;
      case Item.Arc:
        instance = new scope.Path.Arc(props);
        break;
      case Item.Circle:
        instance = new scope.Path.Circle(props);
        break;
      case Item.Ellipse:
        instance = new scope.Path.Ellipse(props);
        break;
      case Item.Line:
        instance = new scope.Path.Line(props);
        break;
      case Item.Rectangle:
        instance = new scope.Path.Rectangle(props);
        break;
      case Item.RegularPolygon:
        instance = new scope.Path.RegularPolygon(props);
        break;
      case Item.PointText:
        instance = new scope.PointText(props);
        break;
      case Item.SymbolItem: {
        const definition = getSymbolDefinition(scope, props);
        instance = new scope.SymbolItem(definition, props.center);
        break;
      }
      case Item.Raster: {
        const { onLoad, ...other } = props;
        instance = new scope.Raster(other);
        if (typeof onLoad === 'function') {
          instance.onLoad = () => onLoad(instance);
        }
        break;
      }
      default:
        throw new Error(`PaperRenderer does not support the type "${type}"`);
    }

    instance.props = other;
    instance.type = type;

    return instance;
  },

  createTextInstance: () => {
    throw new Error('PaperRenderer does not support text children');
  },

  getPublicInstance: (instance: Instance) => instance,
  prepareForCommit: () => null,
  prepareUpdate: () => true,
  resetAfterCommit: () => {},
  resetTextContent: () => {},
  getRootHostContext: () => null,
  getChildHostContext: () => null,
  shouldSetTextContent: () => false,

  getCurrentEventPriority: () => DefaultEventPriority,
  getInstanceFromNode: () => undefined,
  getInstanceFromScope: () => undefined,
  preparePortalMount: () => {},
  prepareScopeUpdate: () => {},
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
  clearContainer: () => {},

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  isPrimaryRenderer: false,
  warnsIfNotActing: false,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,

  appendInitialChild: (parent: Instance, child: Instance) => {
    if (parent instanceof paper.Group && child instanceof paper.Item) {
      child.addTo(parent);
    }
    if (parent instanceof paper.CompoundPath && child instanceof paper.Item) {
      child.addTo(parent);
    }
    if (parent instanceof paper.View && child instanceof paper.Item) {
      child.addTo(parent.project);
    }
  },

  finalizeInitialChildren: (instance: Instance, type: Type, props: Props) => {
    if (instance instanceof paper.View || instance instanceof paper.Tool) {
      applyProps(instance, props);
    }
    return false;
  },

  appendChild: (parent: Instance, child: Instance) => {
    if (parent instanceof paper.Group && child instanceof paper.Item) {
      child.addTo(parent);
    }
    if (parent instanceof paper.View && child instanceof paper.Item) {
      child.addTo(parent.project);
    }
  },

  appendChildToContainer: (container: Container, child: Instance) => {
    if (!(child instanceof paper.View || child instanceof paper.Tool)) {
      throw new Error('Container can only hold View and Tool nodes');
    }
  },

  insertBefore: (parent: Instance, child: Instance, before: Instance) => {
    if (
      parent instanceof paper.Group &&
      child instanceof paper.Item &&
      before instanceof paper.Item
    ) {
      child.insertAbove(before);
    }
  },

  insertInContainerBefore: (
    container: Container,
    child: Instance,
    before: Instance
  ) => {
    if (
      !(child instanceof paper.View || child instanceof paper.Tool) ||
      !(before instanceof paper.View || before instanceof paper.Tool)
    ) {
      throw new Error('Container can only hold View and Tool nodes');
    }
  },

  removeChild: (parent: Instance, child: Instance) => {
    if (typeof child.remove === 'function') {
      child.remove();
    }
  },

  removeChildFromContainer: (container: Container, child: Instance) => {
    if (typeof child.remove === 'function') {
      child.remove();
    }
  },

  commitTextUpdate: () => {},

  commitMount: () => {},

  commitUpdate: (
    instance: Instance,
    payload: unknown,
    type: Type,
    oldProps: Props,
    newProps: Props
  ) => {
    applyProps(instance, newProps, oldProps);
  },
});
