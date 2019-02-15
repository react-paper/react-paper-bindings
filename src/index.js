// @flow

import TYPES from './types'

const {
  CIRCLE,
  ELLIPSE,
  GROUP,
  LAYER,
  LINE,
  PATH,
  POINTTEXT,
  RASTER,
  RECTANGLE,
  ARC,
  TOOL,
} = TYPES

export {
  CIRCLE as Circle,
  ELLIPSE as Ellipse,
  GROUP as Group,
  LAYER as Layer,
  LINE as Line,
  PATH as Path,
  POINTTEXT as PointText,
  RASTER as Raster,
  RECTANGLE as Rectangle,
  ARC as Arc,
  TOOL as Tool,
}

export { default as View } from './View'
export { default as Renderer } from './PaperRenderer'
