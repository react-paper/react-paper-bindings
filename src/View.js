// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import { PaperScope, Size } from 'paper'

import PaperRenderer from './PaperRenderer'

type Props = {
  activeLayer?: ?number,
  activeTool?: ?string,
  children: Node,
  width: number,
  height: number,
}

export default class View extends Component<Props> {

  paper: PaperScope
  canvas: HTMLElement
  mountNode: any

  componentDidMount() {
    const { activeLayer, activeTool, children, width, height } = this.props

    this.paper = new PaperScope()
    this.paper.setup(this.canvas)

    const { project, tools, view } = this.paper

    view.viewSize = new Size(width, height)

    this.mountNode = PaperRenderer.createContainer(this.paper)

    PaperRenderer.updateContainer(children, this.mountNode, this)

    if (typeof activeLayer === 'number') {
      const layer = project.layers.find(l => l.data.id === activeLayer)
      if (layer) layer.activate()
    }

    if (typeof activeTool === 'string') {
      const tool = tools.find(t => t.name === activeTool)
      if (tool) tool.activate()
    }
  }

  componentDidUpdate(prevProps: Props, prevState: ?Props) {
    const { children, width, height } = this.props
    const { view } = this.paper

    PaperRenderer.updateContainer(children, this.mountNode, this)

    if (width !== prevProps.width || height !== prevProps.height) {
      const prevCenter = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(prevCenter))
    }
  }

  componentWillUnmount() {
    PaperRenderer.updateContainer(null, this.mountNode, this)
  }

  canvasRef = (ref: ?HTMLElement) => {
    if (ref) this.canvas = ref
  }

  render() {
    PaperRenderer.injectIntoDevTools({
      bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
      version: '0.1.0', // version for your renderer
      rendererPackageName: 'paper-renderer', // package name
      findHostInstanceByFiber: PaperRenderer.findHostInstance // host instance (root)
    })
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      ...other
    } = this.props
    return (
      <canvas ref={this.canvasRef} {...other} />
    )
  }

}
