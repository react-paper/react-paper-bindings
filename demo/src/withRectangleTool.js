import React, { Component } from 'react'
import { Path } from 'paper'

import { getRandomColor, getRandomInt } from './helpers'

export default function withRectangleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      // create temporary rectangle
      const rectangle = new Path.Rectangle({
        center: e.point,
        fillColor: getRandomColor(),
        size: getRandomInt(10,40),
        selected: true,
      })
      this.props.addItem('Rectangle', {
        data: rectangle.getPathData(),
        fillColor: rectangle.fillColor.toCSS(true),
        selected: true,
      }, () => {
        // remove temporary rectangle
        rectangle.remove()
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          rectangleToolMouseDown={this.mouseDown}
        />
      )
    }

  }

}
