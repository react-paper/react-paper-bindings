// @flow

import ReactFiberReconciler from 'react-reconciler'
import invariant from 'fbjs/lib/invariant'
import emptyObject from 'fbjs/lib/emptyObject'
import _ from "lodash";

import { Group, Item, Layer, Path, PointText, Raster, Tool } from 'paper/dist/paper-core'

import TYPES from './types'
import {arePointsEqual} from "./utils";

function applyItemProps(instance, props, prevProps = {}) {
  if (props.blendMode !== prevProps.blendMode) {
    instance.blendMode = props.blendMode
  }
  if (props.clipMask !== prevProps.clipMask) {
    instance.clipMask = props.clipMask
  }
  if (props.opacity !== prevProps.opacity) {
    instance.opacity = props.opacity
  }
  if (props.selected !== prevProps.selected) {
    instance.selected = props.selected
  }
  if (props.visible !== prevProps.visible) {
    instance.visible = props.visible
  }
}

function applyStyleProps(instance, props) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.selected) {
    instance.selected = props.selected
  }
}


function applyGroupProps(instance, props, prevProps = {}) {
  applyItemProps(instance, props, prevProps)
  if (! _.isEqual(props.center, prevProps.center)) {
    instance.translate([
      props.center[0] - prevProps.center[0],
      props.center[1] - prevProps.center[1],
    ])
  }
  if (! arePointsEqual(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot
    instance.position = props.position
  }
  if (! arePointsEqual(props.position, prevProps.position)) {
    instance.position = props.position
  }
  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    const rotation = props.rotation ? props.rotation : 0
    const prevRotation = prevProps.rotation ? prevProps.rotation : 0
    instance.rotate(rotation - prevRotation)
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
}

function applyLayerProps(instance, props, prevProps = {}) {
  applyItemProps(instance, props, prevProps)
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate()
  }
  if (props.locked !== prevProps.locked) {
    instance.locked = props.locked
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
    instance.children.forEach(child => {
      if (child instanceof Path) {
        child.strokeColor = props.strokeColor
      }
    })
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
}

function applyPathProps(instance, props, prevProps = {}) {
  applyItemProps(instance, props, prevProps)
  if (! _.isEqual(props.center, prevProps.center)) {
    instance.translate([
      props.center[0] - prevProps.center[0],
      props.center[1] - prevProps.center[1],
    ])
  }
  if (! arePointsEqual(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot
    instance.position = props.position
  }
  if (! arePointsEqual(props.position, prevProps.position)) {
    instance.position = props.position
  }
  if (props.closed !== prevProps.closed) {
    instance.closed = props.closed
  }
  if (props.dashArray !== prevProps.dashArray) {
    instance.dashArray = props.dashArray
  }
  if (props.dashOffset !== prevProps.dashOffset) {
    instance.dashOffset = props.dashOffset
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.pathData !== prevProps.pathData) {
    instance.pathData = props.pathData
  }
    if (! _.isEqual(props.point, prevProps.point)) {
    instance.translate([
      props.point[0] - prevProps.point[0],
      props.point[1] - prevProps.point[1],
    ])
  }
  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    const rotation = props.rotation ? props.rotation : 0
    const prevRotation = prevProps.rotation ? prevProps.rotation : 0
    instance.rotate(rotation - prevRotation)
  }
  if (props.strokeCap !== prevProps.strokeCap) {
    instance.strokeCap = props.strokeCap
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.strokeJoin !== prevProps.strokeJoin) {
    instance.strokeJoin = props.strokeJoin
  }
  if (props.strokeScaling !== prevProps.strokeScaling) {
    instance.strokeScaling = props.strokeScaling
  }
  if (props.strokeWidth !== prevProps.strokeWidth) {
    instance.strokeWidth = props.strokeWidth
  }

}

function applyRectangleProps(instance, props, prevProps = {}) {
  applyPathProps(instance, props, prevProps)
  if (! _.isEqual(props.size, prevProps.size)) {
    instance.scale(
      props.size[0] / prevProps.size[0],
      props.size[1] / prevProps.size[1],
    )
  }
}

function applyCircleProps(instance, props, prevProps = {}) {
  applyPathProps(instance, props, prevProps)
  if (props.radius !== prevProps.radius) {
    instance.scale(props.radius / prevProps.radius)
  }
}

function applyEllipseProps(instance, props, prevProps = {}) {
  applyRectangleProps(instance, props, prevProps)
}

function applyRasterProps(instance, props, prevProps = {}) {
  applyItemProps(instance, props, prevProps)
  if (props.source !== prevProps.source) {
    instance.source = props.source
  }
  if (props.onLoad !== prevProps.onLoad) {
    instance.onLoad = props.onLoad
  }
}

function applyPointTextProps(instance, props, prevProps = {}) {
  if (props.content !== prevProps.content) {
    instance.content = props.content
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.fontFamily !== prevProps.fontFamily) {
    instance.fontFamily = props.fontFamily
  }
  if (props.fontSize !== prevProps.fontSize) {
    instance.fontSize = props.fontSize
  }
  if (props.fontWeight !== prevProps.fontWeight) {
    instance.fontWeight = props.fontWeight
  }
  if (! _.isEqual(props.point, prevProps.point)) {
    instance.translate([
      props.point[0] - prevProps.point[0],
      props.point[1] - prevProps.point[1],
    ])
  }
}

function applyToolProps(instance, props, prevProps = {}) {
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate()
  }
  if (props.onMouseDown !== prevProps.onMouseDown) {
    instance.onMouseDown = props.onMouseDown
  }
  if (props.onMouseDrag !== prevProps.onMouseDrag) {
    instance.onMouseDrag = props.onMouseDrag
  }
  if (props.onMouseMove !== prevProps.onMouseMove) {
    instance.onMouseMove = props.onMouseMove
  }
  if (props.onMouseUp !== prevProps.onMouseUp) {
    instance.onMouseUp = props.onMouseUp
  }
  if (props.onKeyUp !== prevProps.onKeyUp) {
    instance.onKeyUp = props.onKeyUp
  }
  if (props.onKeyDown !== prevProps.onKeyDown) {
    instance.onKeyDown = props.onKeyDown
  }
}

const PaperRenderer = ReactFiberReconciler({

  appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, 'Text children should already be flattened.')
    } else if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  createInstance(type, props, paperScope) {
    const { children, ...paperProps } = props
    let instance = {}

    switch (type) {
      case TYPES.TOOL:
        instance = new Tool(paperProps)
        instance._applyProps = applyToolProps
        break
      case TYPES.CIRCLE:
        instance = new Path.Circle(paperProps)
        instance._applyProps = applyCircleProps
        break
      case TYPES.ELLIPSE:
        instance = new Path.Ellipse(paperProps)
        instance._applyProps = applyEllipseProps
        break
      case TYPES.GROUP:
        instance = new Group(paperProps)
        instance._applyProps = applyGroupProps
        break
      case TYPES.LAYER:
        instance = new Layer(paperProps)
        instance._applyProps = applyLayerProps
        break
      case TYPES.LINE:
        instance = new Path.Line(paperProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.PATH:
        instance = new Path(paperProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.POINTTEXT:
        instance = new PointText(paperProps)
        instance._applyProps = applyPointTextProps
        break
      case TYPES.RECTANGLE:
        instance = new Path.Rectangle(paperProps)
        instance._applyProps = applyRectangleProps
        break
      case TYPES.RASTER:
        const { onLoad, ...rasterProps } = paperProps
        instance = new Raster(rasterProps)
        instance._applyProps = applyRasterProps
        if (typeof onLoad === 'function') {
          instance.onLoad = () => onLoad(instance)
        }
        break;
      default:
        invariant(instance, 'PaperRenderer does not support the type "%s"', type)
        break
    }

    if (instance.data && !instance.data.type) {
      instance.data.type = type
    }

    invariant(instance, 'PaperRenderer does not support the type "%s"', type)

    return instance
  },

  createTextInstance(text, rootContainerInstance, paperScope) {
    return text
  },

  finalizeInitialChildren(domElement, type, props) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case TYPES.GROUP:
        if (domElement.applyMatrix) {
          applyGroupProps(domElement, props)
        } else {
          applyStyleProps(domElement, props)
        }
        break
    }
    return false
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return true
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  getRootHostContext() {
    return emptyObject
  },

  getChildHostContext() {
    return emptyObject
  },

  scheduleDeferredCallback: window.requestIdleCallback,

  shouldSetTextContent(type, props) {
    return (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    )
  },

  useSyncScheduling: true,

  now: Date.now,

  mutation: {
    appendChild(parentInstance, child) {
      if (child.parentNode === parentInstance) {
        child.remove()
      }
      if (
        parentInstance instanceof Group &&
        child instanceof Item
      ) {
        child.addTo(parentInstance)
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (child.parentNode === parentInstance) {
        child.remove()
      }
      if (
        parentInstance instanceof Group &&
        child instanceof Item
      ) {
        child.addTo(parentInstance)
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      invariant(
        child !== beforeChild,
        'PaperRenderer: Can not insert node before itself'
      )
      if (
        parentInstance instanceof Group &&
        child instanceof Path &&
        beforeChild instanceof Path
      ) {
        child.insertAbove(beforeChild)
      }
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      invariant(
        child !== beforeChild,
        'PaperRenderer: Can not insert node before itself'
      )
      if (
        parentInstance instanceof Group &&
        child instanceof Path &&
        beforeChild instanceof Path
      ) {
        child.insertAbove(beforeChild)
      }
    },

    removeChild(parentInstance, child) {
      child.remove()
    },

    removeChildFromContainer(parentInstance, child) {
      child.remove()
    },

    commitTextUpdate(textInstance, oldText, newText) {
      // Noop
    },

    commitMount(instance, type, newProps) {
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, paperScope) {
      instance._applyProps(instance, newProps, oldProps)
    },
  },

})

export default PaperRenderer
