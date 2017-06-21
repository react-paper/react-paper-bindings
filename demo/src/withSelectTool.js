import React, { Component } from 'react'

export default function withSelectTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this._item = null
      this._itemDragged = false
      this._point = null
    }

    keyDown = (e) => {
      if (this._item) {
        const { key, modifiers: { shift } } = e
        switch (key) {
          case 'delete':
            const fn = `remove${this._item.reactType}`
            if (typeof this.props[fn] === 'function') {
              this.props[fn](this._item.reactKey, () => {
                this._item = null
                this._itemDragged = false
                this._point = null
              })
            }
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
      const { view } = e.tool
      const hit = view._project.hitTest(e.point, {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 12,
      })
      view._project.deselectAll()
      if (hit && hit.item && hit.item.reactType !== 'Raster' && hit.item.layer.name !== 'ReactLogo') {
        hit.item.fullySelected = true
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
        this._itemDragged = true
        this._point = e.point
      }
    }

    mouseUp = (e) => {
      this._point = null
      if (this._item && this._itemDragged) {
        this._itemDragged = false
        const { center, centerX, centerY } = this._item.bounds
        switch (this._item.reactType) {
          case 'Path':
            this.props.updatePath(this._item.reactKey, {
              data: this._item.getPathData(),
              fullySelected: true,
            })
            break
          case 'Circle':
            this.props.updateCircle(this._item.reactKey, {
              //data: this._item.getPathData(),
              center: [center.x, center.y],
              fullySelected: true,
            })
            break
          case 'Rectangle':
            this.props.updateRectangle(this._item.reactKey, {
              key: this._item.reactKey,
              center: [centerX, centerY],
              size: this._item.size,
              fillColor: this._item.fillColor,
              fullySelected: true,
            })
            break
        }
      }
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
