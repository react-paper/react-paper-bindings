import React, { Component } from 'react'
import { Point } from 'paper'

const ZOOM_FACTOR = 1.1



export default function withMoveTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        sx: 0, // scale center x
        sy: 0, // scale center y
        tx: 0, // translate x
        ty: 0, // translate y
        x: 0,
        y: 0,
        zoom: 1,
        console: [],
      }
      this._pan = null
      this._pinch = null
    }

    /**
     * Fit image into viewport
     *
     * @param  {Raster} image Paper.js Raster instance
     */
    fitImage = (image) => {
      const { imageWidth, imageHeight, width, height } = this.props
      // first fit raster into original image
      image.fitBounds(0, 0, imageWidth, imageHeight)
      // calculate zoom
      const wr = width / imageWidth
      const hr = height / imageHeight
      const zoom = wr < hr ? wr : hr
      // calculate new image size
      const iw = imageWidth * zoom
      const ih = imageHeight * zoom
      // calculate needed translation xy
      const tx = (width-iw) / 2 / zoom
      const ty = (height-ih) / 2 / zoom
      // calculate center xy
      const x = this.state.x + tx
      const y = this.state.y + ty
      // center the image in the middle
      this.setState({ tx, ty, x, y, zoom }, () => {
        // reset translation xy to prevent zoom problems
        // TODO: try to find a better solution
        this.setState({ tx: 0, ty: 0 })
      })
    }

    /**
     * Get pinch zoom event data
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     * @return {Object}      Object representing pinch zoom event
     */
    getPinchEventData(e) {
      const { event: { target, touches } } = e
      const { offsetLeft, offsetTop } = target
      // touch points
      const point0 = new Point(
        touches[0].pageX - offsetLeft,
        touches[0].pageY - offsetTop,
      )
      const point1 = new Point(
        touches[1].pageX - offsetLeft,
        touches[1].pageY - offsetTop,
      )
      // center point between fingers
      const center = new Point(
        (point0.x + point1.x) / 2,
        (point0.y + point1.y) / 2,
      )
      // distance between fingers
      const distance = Math.sqrt(
        Math.pow(point1.x - point0.x, 2) +
        Math.pow(point1.y - point0.y, 2)
      )
      // return object describing touch state
      return { point0, point1, center, distance }
    }

    /**
     * Get pinch zoom state data
     *
     * @param  {Object} prev Previous pinch zoom event data
     * @param  {Object} next Next pinch zoom event data
     * @return {Object}      Next pinch zoom state
     */
    getPinchStateData(prev, next) {
      const { x, y, zoom } = this.state
      const t = next.center.subtract(prev.center).divide(zoom)
      const scale = next.distance / prev.distance
      return {
        tx: t.x,
        ty: t.y,
        sx: next.center.x,
        sy: next.center.y,
        x: x + t.x,
        y: y + t.y,
        zoom: zoom * scale,
      }
    }

    /**
     * Get pan event data
     * @param  {SyntheticEvent} e React's SyntheticEvent
     * @return {object}           Object representing pan event
     */
    getPanEventData(e) {
      const { event: { touches, pageX, pageY }, point } = e
      return {
        point,
        x: (touches) ? touches[0].pageX : pageX,
        y: (touches) ? touches[0].pageY : pageY,
      }
    }

    /**
     * Get pan state data
     *
     * @param  {Object} prev Previous pan event data
     * @param  {Object} next Next pan event data
     * @return {Object}      Next pan state data
     */
    getPanStateData(prev, next) {
      const { x, y } = this.state
      const t = next.point.subtract(prev.point)
      return {
        tx: t.x,
        ty: t.y,
        x: x + (next.x - prev.x),
        y: y + (next.y - prev.y),
      }
    }

    mouseWheel = (e) => {
      const { offsetLeft, offsetTop } = e.nativeEvent.target
      const { x, y, zoom } = this.state

      // calculate new zoom from wheel event
      const newZoom = (e.wheelDelta || -e.deltaY) > 0
        ? zoom * ZOOM_FACTOR
        : zoom / ZOOM_FACTOR

      // calculate zoom ratio
      const ratio = newZoom / zoom

      // get mouse position within image
      const prevX = e.pageX - x
      const prevY = e.pageY - y

      // get diff in mouse positions before and after resize
      const tx = prevX - (prevX * ratio) - offsetLeft
      const ty = prevY - (prevY * ratio) - offsetTop

      this.setState({
        sx: e.pageX - offsetLeft,
        sy: e.pageY - offsetTop,
        x: x + tx,
        y: y + ty,
        zoom: newZoom,
      })
    }

    mouseDown = (e) => {
      this._pan = this.getPanEventData(e)
    }

    mouseDrag = (e) => {
      const { event: { touches } } = e
      if (touches && touches.length === 2) {
        if (!this._pinch) {
          this._pinch = this.getPinchEventData(e)
        } else {
          const prev = this._pinch
          const next = this.getPinchEventData(e)
          this.setState(this.getPinchStateData(prev, next))
          this._pinch = next
        }
      } else {
        const prev = this._pan
        const next = this.getPanEventData(e)
        this.setState(this.getPanStateData(prev, next))
        this._event = next
      }
    }

    mouseUp = (e) => {
      this._point = null
      this._event = null
      this._pinch = null
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          fitImage={this.fitImage}
          moveToolTouchStart={this.touchStart}
          moveToolTouchMove={this.touchMove}
          moveToolTouchEnd={this.touchEnd}
          moveToolMouseWheel={this.mouseWheel}
          moveToolMouseDown={this.mouseDown}
          moveToolMouseDrag={this.mouseDrag}
          moveToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
