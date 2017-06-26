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
      originalWidth, originalHeight,
      normalize, x, y, zoom,
    } = this.props

    this._scope = new PaperScope()
    this._scope.setup(this._canvas)

    const { project, tools, view } = this._scope

    view.viewSize = new Size(width, height)

    this._mountNode = PaperRenderer.createContainer(this._scope)

    PaperRenderer.updateContainer(
      children,
      this._mountNode,
      this,
    )

    if (typeof zoom === 'number') {
      view.zoom = zoom
    }

    if (typeof x === 'number' && typeof y === 'number') {
      view.translate(x, y)
    }

    if (typeof activeTool === 'string') {
      tools.find(t => t.name === activeTool).activate()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children, height, width,
      sx, sy, tx, ty, x, y, zoom,
    } = this.props

    const { view } = this._scope

    let scaleOrTranslate = false

    if (width !== prevProps.width || height !== prevProps.height) {
      const prevCenter = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(prevCenter))
    }

    if (zoom !== prevProps.zoom) {
      view.scale(zoom / prevProps.zoom, view.viewToProject(sx, sy))
      scaleOrTranslate = true
    }

    if (x !== prevProps.x || y !== prevProps.y) {
      view.translate(tx, ty)
      scaleOrTranslate = true
    }

    PaperRenderer.updateContainer(
      children,
      this._mountNode,
      this,
    )
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
