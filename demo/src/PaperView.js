import React from 'react'
import PropTypes from 'prop-types'
import { View, Tool } from 'react-paper-bindings'

import PaperItem from './PaperItem'

const PaperView = (props) => {
  const { items, imageLoaded, viewRef, ...rest } = props
  return (
    <View {...rest} ref={viewRef}>
      {items.map(([type, options], index) =>
        <PaperItem
          id={`${type}${index}`}
          key={`${type}${index}`}
          type={type}
          imageLoaded={imageLoaded}
          onImageLoad={props.onImageLoad}
          {...options}
        />
      )}
      <Tool
        active={props.activeTool === 'select'}
        name={'select'}
        onKeyDown={props.selectToolKeyDown}
        onMouseDown={props.selectToolMouseDown}
        onMouseDrag={props.selectToolMouseDrag}
        onMouseUp={props.selectToolMouseUp}
      />
      <Tool
        active={props.activeTool === 'move'}
        name={'move'}
        onMouseDown={props.moveToolMouseDown}
        onMouseDrag={props.moveToolMouseDrag}
        onMouseUp={props.moveToolMouseUp}
      />
      <Tool
        active={props.activeTool === 'pen'}
        name={'pen'}
        onMouseDown={props.penToolMouseDown}
        onMouseDrag={props.penToolMouseDrag}
        onMouseUp={props.penToolMouseUp}
      />
      <Tool
        active={props.activeTool === 'circle'}
        name={'circle'}
        onMouseDown={props.circleToolMouseDown}
      />
      <Tool
        active={props.activeTool === 'rectangle'}
        name={'rectangle'}
        onMouseDown={props.rectangleToolMouseDown}
      />
      <Tool
        active={props.activeTool === 'delete'}
        name={'delete'}
        onMouseDown={props.deleteToolMouseDown}
      />
    </View>
  )
}

PaperView.propTypes = {
  activeTool: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  sx: PropTypes.number.isRequired,
  sy: PropTypes.number.isRequired,
  tx: PropTypes.number.isRequired,
  ty: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  viewRef: PropTypes.func.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  onImageLoad: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
  selectToolKeyDown: PropTypes.func.isRequired,
  selectToolMouseDown: PropTypes.func.isRequired,
  selectToolMouseDrag: PropTypes.func.isRequired,
  selectToolMouseUp: PropTypes.func.isRequired,
  moveToolMouseDown: PropTypes.func.isRequired,
  moveToolMouseDrag: PropTypes.func.isRequired,
  moveToolMouseUp: PropTypes.func.isRequired,
  penToolMouseDown: PropTypes.func.isRequired,
  penToolMouseDrag: PropTypes.func.isRequired,
  penToolMouseUp: PropTypes.func.isRequired,
  circleToolMouseDown: PropTypes.func.isRequired,
  rectangleToolMouseDown: PropTypes.func.isRequired,
  deleteToolMouseDown: PropTypes.func.isRequired,
}

export default PaperView
