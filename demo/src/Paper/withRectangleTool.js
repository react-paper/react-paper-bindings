import React, { Component } from 'react'
import { Path } from 'paper'

import { getRandomColor, getRandomInt } from './helpers'

export default function withRectangleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      const rectangle = new Path.Rectangle({
        center: e.point,
        fillColor: getRandomColor(),
        size: getRandomInt(20,120),
      })
      this.props.addItem(rectangle.layer, {
        type: 'Rectangle',
        pathData: rectangle.getPathData(),
        fillColor: rectangle.fillColor.toCSS(true),
        selected: true,
      })
      console.log(rectangle);
      console.log(rectangle.getPathData());
      rectangle.remove()
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
