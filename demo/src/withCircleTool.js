import React, { Component } from 'react'
import { Path } from 'paper'

import { getRandomColor, getRandomInt } from './helpers'

export default function withCircleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      // create temporary circle
      const circle = new Path.Circle({
        center: e.point,
        fillColor: getRandomColor(),
        radius: getRandomInt(5,20),
        selected: true,
      })
      this.props.addItem('Circle', {
        data: circle.getPathData(),
        fillColor: circle.fillColor.toCSS(true),
        selected: true,
      }, () => {
        // remove temporary circle
        circle.remove()
      })
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
