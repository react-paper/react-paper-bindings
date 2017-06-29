import React, { Component } from 'react'

const HIT_TEST_OPTIONS = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 12,
}

export default function withSelectTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        activeLayer: null,
        selectedItem: null,
      }
      this._changed = false
      this._item = null
      this._point = null
    }

    selectItem = ({ id, type }) => {
      if (id === this.state.selectedItem) {
        return
      }
      switch (type) {
        case 'Layer':
          this.setState({ activeLayer: id, selectedItem: id })
          break
        case 'Path':
        case 'Circle':
        case 'Rectangle':
          this.setState({ selectedItem: id })
          break
        default:
          break
      }
    }

    deselectItem = () => {
      this.setState({ selectedItem: null })
    }

    keyDown = (e) => {
      if (this._item) {
        const { key, modifiers: { shift } } = e
        switch (key) {
          case 'delete':
            this.props.removeItem(this._item)
            this._changed = false
            this._item = null
            this._point = null
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
          default:
            break
        }
      }
    }

    mouseDown = (e) => {
      this.deselectItem()
      const hit = e.tool.view._project.hitTest(e.point, HIT_TEST_OPTIONS)
      if (hit && hit.item && !hit.item.locked) {
        this.selectItem(hit.item.data)
        hit.item.bringToFront()
        this._item = hit.item
        this._point = e.point
        console.log(this._item)
        console.log(this._item.getPathData && this._item.getPathData())
      } else {
        this._item = null
        this._point = null
      }
    }

    mouseDrag = (e) => {
      if (this._item && this._point) {
        this._item.translate(e.point.subtract(this._point))
        this._changed = true
        this._point = e.point
      }
    }

    mouseUp = (e) => {
      if (this._item && this._changed) {
        this.props.updateItem(this._item, {
          pathData: this._item.getPathData(),
          selected: true,
        })
      }
      this._changed = false
      this._point = null
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          selectItem={this.selectItem}
          deselectItem={this.deselectItem}
          selectToolKeyDown={this.keyDown}
          selectToolMouseDown={this.mouseDown}
          selectToolMouseDrag={this.mouseDrag}
          selectToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
