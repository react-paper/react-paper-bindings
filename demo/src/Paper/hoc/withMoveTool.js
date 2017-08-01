import React, { Component } from 'react'

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
      // fit raster into original image size
      image.fitBounds(0, 0, imageWidth, imageHeight)
      // if image is already loaded
      // do not attempt to fit it again
      if (this._imageLoaded) {
        return
      }
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
        // TODO: try to find a better solution
        // reset translation xy to prevent zoom problems
        this.setState({ tx: 0, ty: 0 })
      })
      // set image loaded
      this._imageLoaded = true
    }

    /**
     * Get pinch zoom event data
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     * @return {Object}      Object representing pinch zoom event
     */
    getPinchEventData(e) {
      const { event: { target: { offsetLeft, offsetTop }, touches } } = e
      // touch points
      const x0 = touches[0].pageX - offsetLeft
      const y0 = touches[0].pageY - offsetTop
      const x1 = touches[1].pageX - offsetLeft
      const y1 = touches[1].pageY - offsetTop
      // center point between fingers
      const center = [(x0 + x1) / 2, (y0 + y1) / 2]
      // distance between fingers
      const distance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
      // return object describing touch state
      return { center, distance }
    }

    /**
     * Get pinch zoom state data
     *
     * @param  {Object} prev Previous pinch zoom event data
     * @param  {Object} next Next pinch zoom event data
     * @return {Object}      Next pinch zoom state
     */
    getPinchEventState(e, prev, next) {
      const { x, y, zoom } = this.state
      const { tool: { view } } = e
      const center = view.viewToProject(next.center)
      const t = center.subtract(view.viewToProject(prev.center))
      const scale = next.distance / prev.distance
      return {
        tx: t.x,
        ty: t.y,
        sx: center.x,
        sy: center.y,
        x: x + t.x,
        y: y + t.y,
        zoom: zoom * scale,
      }
    }

    /**
     * Get pan event data
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     * @return {Object}      Object representing pan event
     */
    getPanEventData(e) {
      const { point, event: { touches, pageX, pageY }, tool: { view } } = e
      return {
        point: view.projectToView(point),
        x: (touches) ? touches[0].pageX : pageX,
        y: (touches) ? touches[0].pageY : pageY,
      }
    }

    /**
     * Get pan event state
     *
     * @param  {ToolEvent} e    Paper.js ToolEvent
     * @param  {Object}    prev Previous pan event data
     * @param  {Object}    next Next pan event data
     * @return {Object}         Next pan state data
     */
    getPanEventState(e, prev, next) {
      const { x, y } = this.state
      const { point, tool: { view } } = e
      const t = point.subtract(view.viewToProject(prev.point))
      return {
        tx: t.x,
        ty: t.y,
        x: x + t.x,
        y: y + t.y,
      }
    }

    /**
     * Mouse wheel handler
     *
     * @param  {SyntheticEvent} e    React's SyntheticEvent
     * @param  {PaperScope}     view Paper.js PaperScope instance
     */
    mouseWheel = (e, { view }) => {
      const { zoom } = this.state
      const { pageX, pageY, nativeEvent } = e
      const { offsetLeft, offsetTop } = nativeEvent.target
      // get wheel delta
      const delta = -e.deltaY || e.wheelDelta
      // calculate new zoom from wheel event delta
      const newZoom = delta > 0 ? zoom * ZOOM_FACTOR : zoom / ZOOM_FACTOR
      // convert mouse point to project space
      const s = view.viewToProject(pageX - offsetLeft, pageY - offsetTop)
      // scale paper
      this.setState({
        sx: s.x,
        sy: s.y,
        zoom: newZoom,
      })
    }

    /**
     * Mouse down handler
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     */
    mouseDown = (e) => {
      //this._pan = this.getPanEventData(e)
    }

    /**
     * Mouse drag handler
     *
     * @TODO: fix start pan glitch
     * @TODO: transforming view manually is much faster,
     * figure out how to do it fast with react
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     */
    mouseDrag = (e) => {
      const { event: { touches }, tool: { view } } = e
      if (touches && touches.length === 2) {
        // pinch zoom
        if (!this._pinch) {
          this._pinch = this.getPinchEventData(e)
          return
        }
        const prev = this._pinch
        const next = this.getPinchEventData(e)
        //this.setState(this.getPinchEventState(e, prev, next))
        const { sx, sy, tx, ty, zoom } = this.getPinchEventState(e, prev, next)
        // transform view manually
        view.scale(zoom / this.state.zoom, [sx, sy])
        view.translate(tx, ty)
        this._pinch = next
      } else {
        // pan
        if (!this._pan) {
          this._pan = this.getPanEventData(e)
          return
        }
        const prev = this._pan
        const next = this.getPanEventData(e)
        //this.setState(this.getPanEventState(e, prev, next))
        const { tx, ty } = this.getPanEventState(e, prev, next)
        // transform view manually
        view.translate(tx, ty)
        this._pan = next
      }
    }

    /**
     * Mouse up handler
     *
     * @param  {ToolEvent} e Paper.js ToolEvent
     */
    mouseUp = (e) => {
      this._pan = null
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
