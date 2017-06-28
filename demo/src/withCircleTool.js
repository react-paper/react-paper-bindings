import React, { Component } from 'react'
import { Path } from 'paper'

import { getRandomColor, getRandomInt } from './helpers'

export default function withCircleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      const circle = new Path.Circle({
        center: e.point,
        fillColor: getRandomColor(),
        radius: getRandomInt(10, 60),
        selected: true,
      })
      this.props.addItem('Circle', {
        data: circle.getPathData(),
        fillColor: circle.fillColor.toCSS(true),
        selected: true,
      })
      //console.log(circle.getPathData());
      circle.remove()
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
