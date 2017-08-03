import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PaperScope, Size } from 'paper'

import PaperRenderer from './PaperRenderer'

export default class View extends Component {

  /**
   * PaperScope reference
   *
   * @type {PaperScope}
   */
  paper = null

  static propTypes = {
    activeLayer: PropTypes.number,
    activeTool: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onWheel: PropTypes.func,
    onDoubleClick: PropTypes.func,
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
      activeLayer,
      activeTool,
      children,
      width,
      height,
      x,
      y,
      zoom,
    } = this.props

    this.paper = new PaperScope()
    this.paper.setup(this._canvas)

    const { project, tools, view } = this.paper

    view.viewSize = new Size(width, height)

    this._mountNode = PaperRenderer.createContainer(this.paper)

    PaperRenderer.updateContainer(children, this._mountNode, this)

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
    const {
      children,
      width,
      height,
      sx,
      sy,
      tx,
      ty,
      x,
      y,
      zoom,
    } = this.props

    const { view } = this.paper

    if (width !== prevProps.width || height !== prevProps.height) {
      const prevCenter = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(prevCenter))
    }

    if (zoom !== prevProps.zoom) {
      view.scale(zoom / prevProps.zoom, [sx, sy])
    }

    if (x !== prevProps.x || y !== prevProps.y) {
      view.translate(tx, ty)
    }

    PaperRenderer.updateContainer(children, this._mountNode, this)
  }

  componentWillUnmount() {
    PaperRenderer.updateContainer(null, this._mountNode, this)
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
    const { className, width, height, onWheel, onDoubleClick } = this.props
    const canvasProps = {
      className,
      width,
      height,
      ref: ref => this._canvas = ref,
      onWheel: onWheel ? this.onWheel : null,
      onDoubleClick: onDoubleClick ? this.onDoubleClick : null,
    }
    return (
      <canvas {...canvasProps} />
    )
  }

}
