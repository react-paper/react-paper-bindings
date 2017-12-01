import React, { Component } from 'react'
import randomColor from 'randomcolor'
import randomInt from 'random-int'

export default function withCircleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      this.props.deselectItem()
      const paper = e.tool._scope
      const circle = new paper.Path.Circle({
        center: e.point,
        fillColor: randomColor(),
        radius: randomInt(10, 60),
      })
      const item = this.props.addItem(circle.layer, {
        type: 'Circle',
        pathData: circle.getPathData(),
        fillColor: circle.fillColor.toCSS(true),
      })
      console.log(circle)
      console.log(circle.getPathData())
      circle.remove()
      this.props.selectItem(item)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          circleToolMouseDown={this.mouseDown}
        />
      )
    }

  }

}
