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
      e.tool.view._project.deselectAll()
      const hit = e.tool.view._project.hitTest(e.point, HIT_TEST_OPTIONS)
      if (
        hit && hit.item &&
        hit.item.reactType !== 'Raster' &&
        hit.item.layer.name !== 'ReactLogo'
      ) {
        const { reactId, reactType } = hit.item
        this.props.removeItem(reactType, reactId)
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
