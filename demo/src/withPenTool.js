import React, { Component } from 'react'
import { Path } from 'paper'

export default function withPenTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this._path = null
    }

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
    }

    mouseDrag = (e) => {
      if (!this._path) {
        this._path = new Path({
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
        this.props.addItem('Path', {
          data: this._path.getPathData(),
          selected: true,
        })
        console.log(this._path.getPathData());
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
