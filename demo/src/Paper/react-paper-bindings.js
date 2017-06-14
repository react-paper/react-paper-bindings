import React, { Component } from 'react'
import PropTypes from 'prop-types'

import invariant from 'fbjs/lib/invariant'
import emptyObject from 'fbjs/lib/emptyObject'
import { ReactFiberReconciler } from 'react-dom'

import {
  Group,
  Item,
  Layer,
  Matrix,
  PaperScope,
  Path,
  PointText,
  Size,
  Tool,
} from 'paper'

const TYPES = {
  LAYER: 'Layer',
  GROUP: 'Group',
  PATH: 'Path',
  CIRCLE: 'Circle',
  ELLIPSE: 'Ellipse',
  RECTANGLE: 'Rectangle',
  POINTTEXT: 'PointText',
  TOOL: 'Tool',
}

class View extends Component {

  static propTypes = {
    activeTool: PropTypes.string,
    cx: PropTypes.number,
    cy: PropTypes.number,
    dx: PropTypes.number,
    dy: PropTypes.number,
    height: PropTypes.number.isRequired,
    normalize: PropTypes.number,
    onWheel: PropTypes.func,
    width: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }

  hitTest(point, options) {
    return this._paper.project.hitTest(point, options)
  }

  exportActiveLayer(normalize) {
    const { activeLayer } = this._paper.project
    const { x, y } = this.props

    // export paths, circles and icons
    const paths = []
    const circles = []
    const icons = []

    // get export matrix
    const matrix = new Matrix()
    matrix.scale(normalize)
    matrix.translate(-x, -y)

    // clone and normalize layer
    const clone = activeLayer.clone()
    clone.transform(matrix)

    // export children
    clone.children.forEach(child => {
      if (child instanceof Path) {
        const segments = child.segments.map(s => ({
          point:     { x: s.point.x,     y: s.point.y },
          handleIn:  { x: s.handleIn.x,  y: s.handleIn.y },
          handleOut: { x: s.handleOut.x, y: s.handleOut.y },
        }))
        paths.push(segments)
      }
    })

    // remove clone
    clone.remove()

    // reactivate layer
    activeLayer.activate()

    return { paths, circles, icons }
  }

  componentDidMount() {
    const {
      activeTool, children, height, width,
      normalize, x, y,
    } = this.props

    this._paper = new PaperScope()
    this._paper.setup(this._canvas)

    const { project, tools, view } = this._paper

    view.autoUpdate = false

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

    if (typeof x === 'number' && typeof y === 'number') {
      view.translate(x, y)
    }

    if (typeof activeTool === 'string') {
      tools.forEach(t => {
        if (t.name === activeTool) t.activate()
      })
    }

    view.update()
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children, height, width,
      cx, cy, dx, dy, x, y, zoom,
    } = this.props

    PaperRenderer.updateContainer(
      children,
      this._mountNode,
      this,
    )

    const { view } = this._paper

    if (width !== prevProps.width || height !== prevProps.height) {
      view.viewSize = new Size(width, height)
    }

    if (zoom !== prevProps.zoom) {
      view.scale(zoom / prevProps.zoom, view.viewToProject(cx, cy))
    } else if (x !== prevProps.x || y !== prevProps.y) {
      view.translate(dx, dy)
    }

    view.update()
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

function applyGroupProps(instance, props, prevProps = {}) {
  if (props.rotation !== prevProps.rotation) {
    instance.rotate(props.rotation - prevProps.rotation)
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
}

function applyPathProps(instance, props, prevProps = {}) {
  if (props.center !== prevProps.center) {
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

function applyCircleProps(instance, props, prevProps = {}) {
  applyPathProps(instance, props, prevProps)
  if (props.radius !== prevProps.radius) {
    instance.scale(props.radius / prevProps.radius)
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

function applyEllipseProps(instance, props, prevProps = {}) {
  applyRectangleProps(instance, props, prevProps)
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

  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    instance._applyProps(instance, newProps, oldProps)
  },

  createInstance(type, props, internalInstanceHandle) {
    const { children, ...instanceProps } = props
    let instance

    switch (type) {
      case TYPES.TOOL:
        instance = new Tool(instanceProps)
        instance._applyProps = applyToolProps
        break
      case TYPES.LAYER:
        instance = new Layer(instanceProps)
        instance._applyProps = applyLayerProps
        break
      case TYPES.GROUP:
        instance = new Group(instanceProps)
        instance._applyProps = applyGroupProps
        break
      case TYPES.PATH:
        instance = new Path(instanceProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.CIRCLE:
        instance = new Path.Circle(instanceProps)
        instance._applyProps = applyCircleProps
        break
      case TYPES.ELLIPSE:
        instance = new Path.Ellipse(instanceProps)
        instance._applyProps = applyEllipseProps
        break
      case TYPES.RECTANGLE:
        instance = new Path.Rectangle(instanceProps)
        instance._applyProps = applyRectangleProps
        break
      case TYPES.POINTTEXT:
        instance = new PointText(instanceProps)
        instance._applyProps = applyPointTextProps
        break
      default:
        invariant(instance, 'PaperReact does not support the type "%s"', type)
        break
    }

    invariant(instance, 'PaperReact does not support the type "%s"', type)

    //instance._applyProps(instance, props)

    return instance
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
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
  LAYER,
  GROUP,
  PATH,
  CIRCLE,
  ELLIPSE,
  RECTANGLE,
  POINTTEXT,
  TOOL,
} = TYPES

export {
  View,
  LAYER as Layer,
  GROUP as Group,
  PATH as Path,
  CIRCLE as Circle,
  ELLIPSE as Ellipse,
  RECTANGLE as Rectangle,
  POINTTEXT as PointText,
  TOOL as Tool,
}
