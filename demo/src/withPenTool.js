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
        // create temporary path
        this._path = new Path({
          fullySelected: true,
          segments: [e.point],
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
        this._path.simplify(4)
        this.props.addPath({
          data: this._path.getPathData(),
          fullySelected: true,
        }, () => {
          // remove temporary path
          this._path.remove()
          this._path = null
        })
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
