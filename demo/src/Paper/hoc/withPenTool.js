import React, { Component } from 'react'

export default function withPenTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this._path = null
    }

    mouseDown = (e) => {
      this.props.deselectItem()
    }

    mouseDrag = (e) => {
      const paper = e.tool._scope
      if (!this._path) {
        this._path = new paper.Path({
          segments: [e.point],
          selected: true,
          strokeColor: 'red',
          strokeScaling: false,
          strokeWidth: 2,
        })
      } else {
        this._path.add(e.point)
      }
    }

    mouseUp = (e) => {
      if (this._path) {
        this._path.simplify(6)
        const item = this.props.addItem(this._path.layer, {
          type: 'Path',
          pathData: this._path.getPathData(),
          strokeColor: this._path.style.strokeColor.toCSS(true),
          strokeScaling: this._path.strokeScaling,
          strokeWidth: this._path.strokeWidth,
        })
        console.log(this._path)
        console.log(this._path.getPathData())
        this.props.selectItem(item)
        this._path.remove()
        this._path = null
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          penToolMouseDown={this.mouseDown}
          penToolMouseDrag={this.mouseDrag}
          penToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
