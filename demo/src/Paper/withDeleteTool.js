import React, { Component } from 'react'

const HIT_TEST_OPTIONS = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 12,
}

export default function withDeleteTool(WrappedComponent) {

  return class extends Component {

    mouseDown = (e) => {
      this.props.deselectItem()
      const hit = e.tool.view._project.hitTest(e.point, HIT_TEST_OPTIONS)
      if (hit && hit.item && !hit.item.locked) {
        this.props.removeItem(hit.item)
        this.props.deselectItem()
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          deleteToolMouseDown={this.mouseDown}
        />
      )
    }

  }

}
