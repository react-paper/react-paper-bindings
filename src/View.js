// @flow

import React, { Component } from 'react'
import { PaperScope, Size } from 'paper/dist/paper-core'

import type { Node } from 'react'
import type { FiberRoot } from 'react-reconciler'

import PaperRenderer from './PaperRenderer'

type Props = {
  activeLayer?: ?number,
  activeTool?: ?string,
  children: Node,
  width: number,
  height: number,
  settings?: Object,
}

export default class View extends Component<Props> {
  paper: PaperScope
  canvas: HTMLElement
  mountNode: FiberRoot

  componentDidMount() {
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      settings,
    } = this.props

    this.paper = new PaperScope()
    this.paper.setup(this.canvas)

    if (settings) {
      this.paper.settings = Object.assign({}, this.paper.settings, settings);
    }

    const { project, tools, view } = this.paper

    view.viewSize = new Size(width, height)

    this.mountNode = PaperRenderer.createContainer(this.paper)

    PaperRenderer.updateContainer(children, this.mountNode, this)

    // initial active layer
    if (typeof activeLayer === 'number') {
      const layer = project.layers.find(l => l.data.id === activeLayer)
      if (layer) layer.activate()
    }

    // initial active tool
    if (typeof activeTool === 'string') {
      const tool = tools.find(t => t.name === activeTool)
      if (tool) tool.activate()
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { children, width, height } = this.props
    const { view } = this.paper

    PaperRenderer.updateContainer(children, this.mountNode, this)

    // size has changed, update center
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
      version: '0.10.0',
      rendererPackageName: 'react-paper-bindings',
      findHostInstanceByFiber: PaperRenderer.findHostInstance,
    })
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      ...other
    } = this.props
    return <canvas {...other} ref={this.canvasRef} />
  }
}
