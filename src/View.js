// @flow

import React, { Component } from 'react'
import { PaperScope, Size } from 'paper/dist/paper-core'

import type { Node, ElementRef } from 'react'
import type { FiberRoot } from 'react-reconciler'

import PaperRenderer from './PaperRenderer'

type CanvasRef = {
  current: ElementRef<any> | null,
}

type Props = {
  children?: Node,
  width: number,
  height: number,
  settings?: Object,
}

export default class View extends Component<Props> {
  canvas: CanvasRef
  scope: PaperScope
  mountNode: FiberRoot

  constructor(props: Props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const { children, width, height, settings } = this.props

    this.scope = new PaperScope()
    this.scope.setup(this.canvas.current)

    if (settings) {
      for (let key of Object.keys(settings)) {
        this.scope.settings[key] = settings[key]
      }
    }

    this.scope.view.viewSize = new Size(width, height)

    this.mountNode = PaperRenderer.createContainer(this.scope)

    PaperRenderer.updateContainer(children, this.mountNode, this)
  }

  componentDidUpdate(prevProps: Props) {
    const { children, width, height } = this.props
    const { view } = this.scope

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

  render() {
    const { children, width, height, ...other } = this.props
    return <canvas {...other} ref={this.canvas} />
  }
}

PaperRenderer.injectIntoDevTools({
  findFiberByHostInstance: () => null,
  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
  version: '16.5.2',
  rendererPackageName: 'react-paper-bindings',
})
