import React, { Component } from 'react'
import { ReactFiberReconciler } from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'fbjs/lib/invariant'
import emptyObject from 'fbjs/lib/emptyObject'

import {
  Group,
  Item,
  Layer,
  Matrix,
  PaperScope,
  Path,
  PointText,
  Raster,
  Size,
  Tool,
} from 'paper'

const TYPES = {
  CIRCLE: 'Circle',
  ELLIPSE: 'Ellipse',
  GROUP: 'Group',
  LAYER: 'Layer',
  PATH: 'Path',
  POINTTEXT: 'PointText',
  RASTER: 'Raster',
  RECTANGLE: 'Rectangle',
  TOOL: 'Tool',
}

class View extends Component {

  static propTypes = {
    activeTool: PropTypes.string,
    height: PropTypes.number.isRequired,
    normalize: PropTypes.number,
    onWheel: PropTypes.func,
    width: PropTypes.number.isRequired,
    sx: PropTypes.number,
    sy: PropTypes.number,
    tx: PropTypes.number,
    ty: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }

  componentDidMount() {
    const {
      activeTool, children, height, width,
      normalize, x, y, zoom,
    } = this.props

    this._paper = new PaperScope()
    this._paper.setup(this._canvas)

    const { project, tools, view } = this._paper

    view.viewSize = new Size(width, height)

    this._mountNode = PaperRenderer.createContainer(this._paper)

    PaperRenderer.updateContainer(
      children,
      this._mountNode,
      this,
    )

    if (typeof normalize === 'number') {
      const nm = new Matrix().scale(normalize)
      project.layers.forEach(l => l.transform(nm))
    }

    if (typeof zoom === 'number') {
      view.zoom = zoom
    }

    if (typeof x === 'number' && typeof y === 'number') {
      view.translate(x, y)
    }

    if (typeof activeTool === 'string') {
      tools.forEach(t => {
        if (t.name === activeTool) t.activate()
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children, height, width,
      sx, sy, tx, ty, x, y, zoom,
    } = this.props

    const { view } = this._paper

    if (width !== prevProps.width || height !== prevProps.height) {
      const center = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(center))
    } else if (zoom !== prevProps.zoom) {
      view.scale(zoom / prevProps.zoom, view.viewToProject(sx, sy))
    } else if (x !== prevProps.x || y !== prevProps.y) {
      view.translate(tx, ty)
    } else {
      PaperRenderer.updateContainer(
        children,
        this._mountNode,
        this,
      )
    }
  }

  componentWillUnmount() {
    PaperRenderer.updateContainer(
      null,
      this._mountNode,
      this,
    )
  }

  render() {
    const { height, onWheel, width } = this.props
    const canvasProps = {
      ref: ref => this._canvas = ref,
      height,
      onWheel,
      width,
    }
    return (
      <canvas {...canvasProps} />
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
function applyGroupProps(instance, props, prevProps = {}) {
  if (props.rotation !== prevProps.rotation) {
    instance.rotate(props.rotation - prevProps.rotation)
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
}
function applyLayerProps(instance, props, prevProps = {}) {
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate()
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
    instance.children.forEach(child => {
      if (child instanceof Path) {
        child.strokeColor = props.strokeColor
      }
    })
  }
}
function applyPathProps(instance, props, prevProps = {}) {
  if (props.center !== prevProps.center) {
    console.log('prev', prevProps.center, 'next', props.center);
    instance.translate([
      props.center[0] - prevProps.center[0],
      props.center[1] - prevProps.center[1],
    ])
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
  if (props.data !== prevProps.data) {
    //console.log('set path data', props.data);
    instance.setPathData(props.data)
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.point !== prevProps.point) {
    instance.translate([
      props.point[0] - prevProps.point[0],
      props.point[1] - prevProps.point[1],
    ])
  }
  if (props.rotation !== prevProps.rotation) {
    instance.rotate(props.rotation - prevProps.rotation)
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
  applyCircleProps(instance, props, prevProps)
  if (props.size !== prevProps.size) {
    instance.scale(
      props.size[0] / prevProps.size[0],
      props.size[1] / prevProps.size[1],
    )
  }
}
function applyRasterProps(instance, props, prevProps = {}) {
  // TODO
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
  if (props.point !== prevProps.point) {
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
}

const PaperRenderer = ReactFiberReconciler({

  appendChild(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove()
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, 'Text children should already be flattened.')
      return
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
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

  createInstance(type, props, paperScope) {
    const { children, ...paperProps } = props
    let instance

    switch (type) {
      case TYPES.CIRCLE:
        instance = new Path.Circle(paperProps)
        instance._applyProps = applyCircleProps
        if (paperProps.data) {
          instance.setPathData(paperProps.data)
        }
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
      case TYPES.PATH:
        instance = new Path(paperProps)
        instance._applyProps = applyPathProps
        if (paperProps.data) {
          instance.setPathData(paperProps.data)
        }
        break
      case TYPES.POINTTEXT:
        instance = new PointText(paperProps)
        instance._applyProps = applyPointTextProps
        break
      case TYPES.RASTER:
        instance = new Raster(paperProps)
        instance._applyProps = applyRasterProps
        instance.onLoad = () => {
          if (paperProps.fitToView) {
            instance.fitBounds(instance.view.bounds)
          }
          if (typeof paperProps.onLoad === 'function') {
            paperProps.onLoad(...arguments)
          }
        }
        break;
      case TYPES.RECTANGLE:
        instance = new Path.Rectangle(paperProps)
        instance._applyProps = applyRectangleProps
        if (paperProps.data) {
          instance.setPathData(paperProps.data)
        }
        break
      case TYPES.TOOL:
        instance = new Tool(paperProps)
        instance._applyProps = applyToolProps
        break
      default:
        invariant(instance, 'PaperReact does not support the type "%s"', type)
        break
    }

    instance.reactType = type

    invariant(instance, 'PaperReact does not support the type "%s"', type)

    return instance
  },

  createTextInstance(text, rootContainerInstance, paperScope) {
    return text
  },

  finalizeInitialChildren(domElement, type, props) {
    return false
  },

  insertBefore(parentInstance, child, beforeChild) {
    invariant(
      child !== beforeChild,
      'PaperReact: Can not insert node before itself'
    )

    if (child instanceof Item && beforeChild instanceof Item) {
      //child.insertAbove(beforeChild)
    }
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return true
  },

  removeChild(parentInstance, child) {
    //destroyEventListeners(child)

    child.remove()
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  getRootHostContext() {
    return emptyObject
  },

  getChildHostContext() {
    return emptyObject
  },

  scheduleAnimationCallback: window.requestAnimationFrame,

  scheduleDeferredCallback: window.requestIdleCallback,

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    )
  },

  useSyncScheduling: true,
})

const {
  CIRCLE,
  ELLIPSE,
  GROUP,
  LAYER,
  PATH,
  POINTTEXT,
  RASTER,
  RECTANGLE,
  TOOL,
} = TYPES

export {
  CIRCLE as Circle,
  ELLIPSE as Ellipse,
  GROUP as Group,
  LAYER as Layer,
  PATH as Path,
  POINTTEXT as PointText,
  RASTER as Raster,
  RECTANGLE as Rectangle,
  TOOL as Tool,
  View,
}
