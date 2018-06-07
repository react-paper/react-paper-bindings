import React from "react";
import {Path, Point} from "paper";
import {Line} from "../../../src/index";
import _ from "lodash";

// create grid lines by React component
export const createGridLines = (width, height, gridSize) => {
  let ret = []
  const verticalLines = _.range(width / gridSize).map(i => {
    return (
      <Line
        from={new Point(gridSize * i, 0)}
        to={new Point(gridSize * i, height)}
        strokeColor={'red'}
      />)
  })
  const horizontalLines = _.range(height / gridSize).map(i => {
    return (
      <Line
        from={new Point(0, gridSize * i)}
        to={new Point(width, gridSize * i)}
        strokeColor={'red'}
      />)
  })

  ret.push(verticalLines)
  ret.push(horizontalLines)
  return ret
}

// draw grid lines by paper.js
export const drawGridLines = (width, height, gridSize) => {
  const verticalLines = _.range(width / gridSize).map(i => {
    new Path.Line({
      from: new Point(gridSize * i, 0),
      to: new Point(gridSize * i, height),
      strokeColor: 'red'
    })
  })
  const horizontalLines = _.range(height / gridSize).map(i => {
    new Path.Line({
      from: new Point(gridSize * i, 0),
      to: new Point(gridSize * i, height),
      strokeColor: 'red'
    })
    new Path.Line({
      from: new Point(0, gridSize * i),
      to: new Point(width, gridSize * i),
      strokeColor: 'red'
    })
  })
}

