import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Matrix, PaperScope, Size } from 'paper'

import PaperRenderer from './PaperRenderer'

export default class View extends Component {

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
