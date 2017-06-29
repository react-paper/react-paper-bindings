import React, { Component } from 'react'
import { Path } from 'paper'

import { getRandomColor, getRandomInt } from './helpers'

export default function withCircleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      this.props.deselectItem()
      const circle = new Path.Circle({
        center: e.point,
        fillColor: getRandomColor(),
        radius: getRandomInt(10, 60),
      })
      const item = this.props.addItem(circle.layer, {
        type: 'Circle',
        pathData: circle.getPathData(),
        fillColor: circle.fillColor.toCSS(true),
      })
      console.log(circle);
      console.log(circle.getPathData());
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
