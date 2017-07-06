import React, { Component } from 'react'
import { Path } from 'paper'
import randomColor from 'randomcolor'
import randomInt from 'random-int'

export default function withRectangleTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      this.props.deselectItem()
      const rectangle = new Path.Rectangle({
        center: e.point,
        fillColor: randomColor(),
        size: randomInt(20,120),
      })
      const item = this.props.addItem(rectangle.layer, {
        type: 'Rectangle',
        pathData: rectangle.getPathData(),
        fillColor: rectangle.fillColor.toCSS(true),
      })
      console.log(rectangle)
      console.log(rectangle.getPathData())
      rectangle.remove()
      this.props.selectItem(item)
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
