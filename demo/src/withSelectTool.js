import React, { Component } from 'react'

export default function withSelectTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this._dragged = false
      this._item = null
      this._point = null
    }

    keyDown = (e) => {
      if (this._item) {
        const { key, modifiers: { shift } } = e
        switch (key) {
          case 'delete':
            const { reactId, reactType } = this._item
            this.props.removeItem(reactType, reactId, () => {
              this._dragged = false
              this._item = null
              this._point = null
            })
            break
          case 'up':
            this._item.translate(0, shift ? -10 : -1)
            break
          case 'down':
            this._item.translate(0, shift ? 10 : 1)
            break
          case 'left':
            this._item.translate(shift ? -10 : -1, 0)
            break
          case 'right':
            this._item.translate(shift ? 10 : 1, 0)
            break
          // no default
        }
      }
    }

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      const hit = e.tool.view._project.hitTest(e.point, {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 12,
      })
      if (
        hit && hit.item
        //hit.item.reactType !== 'Raster' &&
        //hit.item.layer.name !== 'ReactLogo'
      ) {
        hit.item.selected = true
        hit.item.bringToFront()
        this._item = hit.item
        this._point = e.point
      } else {
        this._item = null
        this._point = null
      }
    }

    mouseDrag = (e) => {
      if (this._item && this._point) {
        const t = e.point.subtract(this._point)
        this._item.translate(t.x, t.y)
        this._dragged = true
        this._point = e.point
      }
    }

    mouseUp = (e) => {
      if (
        this._item &&
        this._dragged &&
        typeof this._item.getPathData === 'function'
      ) {
        const { reactId, reactType } = this._item
        this.props.updateItem(reactType, reactId, {
          data: this._item.getPathData(),
          selected: true,
        })
      }
      this._dragged = false
      this._point = null
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          selectToolKeyDown={this.keyDown}
          selectToolMouseDown={this.mouseDown}
          selectToolMouseDrag={this.mouseDrag}
          selectToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
