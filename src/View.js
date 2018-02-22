import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PaperScope, Size } from 'paper/dist/paper-core'

import PaperRenderer from './PaperRenderer'

export default class View extends Component {

  /**
   * PaperScope reference
   *
   * @type {PaperScope}
   */
  paper = null

  /**
   * Canvas DOM reference
   *
   * @type {HTMLElement}
   */
  canvas = null

  static propTypes = {
    activeLayer: PropTypes.number,
    activeTool: PropTypes.string,
    canvasProps: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    matrix: PropTypes.shape({
      sx: PropTypes.number.isRequired,
      sy: PropTypes.number.isRequired,
      tx: PropTypes.number.isRequired,
      ty: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    onWheel: PropTypes.func,
    onDoubleClick: PropTypes.func,
  }

  componentDidMount() {
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      matrix,
    } = this.props

    const { x, y, zoom } = matrix

    this.paper = new PaperScope()
    this.paper.setup(this.canvas)

    const { project, tools, view } = this.paper

    view.viewSize = new Size(width, height)

    this.mountNode = PaperRenderer.createContainer(this.paper)

    PaperRenderer.updateContainer(children, this.mountNode, this)

    if (typeof zoom === 'number') {
      view.zoom = zoom
    }

    if (typeof x === 'number' && typeof y === 'number') {
      view.translate(x, y)
    }

    if (typeof activeLayer === 'number') {
      const layer = project.layers.find(l => l.data.id === activeLayer)
      if (layer) layer.activate()
    }

    if (typeof activeTool === 'string') {
      const tool = tools.find(t => t.name === activeTool)
      if (tool) tool.activate()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { children, width, height, matrix } = this.props
    const { sx, sy, tx, ty, x, y, zoom } = matrix
    const { view } = this.paper

    if (width !== prevProps.width || height !== prevProps.height) {
      const prevCenter = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(prevCenter))
    }

    if (zoom !== prevProps.matrix.zoom) {
      view.scale(zoom / prevProps.matrix.zoom, [sx, sy])
    }

    if (x !== prevProps.matrix.x || y !== prevProps.matrix.y) {
      view.translate(tx, ty)
    }

    PaperRenderer.updateContainer(children, this.mountNode, this)
  }

  componentWillUnmount() {
    PaperRenderer.updateContainer(null, this.mountNode, this)
  }

  onWheel = (e) => {
    if (this.props.onWheel) {
      this.props.onWheel(e, this.paper)
    }
  }

  onDoubleClick = (e) => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(e, this.paper)
    }
  }

  render() {
    const { className, canvasProps } = this.props
    PaperRenderer.injectIntoDevTools({
      bundleType: 1,
      version: '1.0.3',
      rendererPackageName: 'paper-renderer',
      findHostInstanceByFiber: PaperRenderer.findHostInstance
    })
    return (
      <canvas
        ref={ref => this.canvas = ref}
        {...canvasProps}
        className={className}
        onWheel={this.onWheel}
        onDoubleClick={this.onDoubleClick}
      />
    )
  }

}
