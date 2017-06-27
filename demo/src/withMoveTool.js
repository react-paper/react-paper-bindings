import React, { Component } from 'react'

import { getEventXY } from './helpers'

const ZOOM_FACTOR = 1.1

export default function withMoveTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        sx: 0,
        sy: 0,
        tx: 0,
        ty: 0,
        x: 0,
        y: 0,
        zoom: 1,
      }
      this._event = null
      this._point = null
    }

    fitImage = (image) => {
      const { width, height } = this.props
      const wr = width / image.width
      const hr = height / image.height
      const zoom = wr < hr ? wr : hr
      const iw = image.width * zoom
      const ih = image.height * zoom
      const tx = (width-iw) / 2 / zoom
      const ty = (height-ih) / 2 / zoom
      const x = this.state.x + tx
      const y = this.state.y + ty
      // set fix state
      this.setState({ tx, ty, x, y, zoom }, () => {
        // reset translation xy to prevent zoom problems
        // TODO: try to find a better solution
        this.setState({ tx: 0, ty: 0 })
      })
    }

    mouseWheel = (e) => {
      const { top, left } = this.props
      const { x, y, zoom } = this.state

      // calculate new zoom from wheel event
      const newZoom = (e.wheelDelta || -e.deltaY) > 0
        ? zoom * ZOOM_FACTOR
        : zoom / ZOOM_FACTOR

      // calculate zoom ratio
      const ratio = newZoom / zoom

      // get mouse position within image
      const prevX = e.pageX - x - left
      const prevY = e.pageY - y - top

      // get diff in mouse positions before and after resize
      const tx = prevX - prevX * ratio
      const ty = prevY - prevY * ratio

      this.setState({
        sx: e.pageX - left,
        sy: e.pageY - top,
        x: x + tx,
        y: y + ty,
        zoom: newZoom,
      })
    }

    mouseDown = (e) => {
      this._point = e.point
      this._event = e.event
    }

    mouseDrag = (e) => {
      const { x, y } = this.state
      const t = e.point.subtract(this._point)
      const curr = getEventXY(e.event)
      const prev = getEventXY(this._event)
      this.setState({
        tx: t.x,
        ty: t.y,
        x: x + (curr.x - prev.x),
        y: y + (curr.y - prev.y),
      })
      // do not set next point!
      this._event = e.event
    }

    mouseUp = (e) => {
      this._point = null
      this._event = null
    }

    /*
    touchStart = (e) => {
      console.log('touchStart', e);
      return

      switch (e.touches.length) {
        case 1:

        // set touch action
        this.touchAction = 'moving';

        // get start touches
        this.startX0 = e.touches[0].pageX;
        this.startY0 = e.touches[0].pageY;

        break;

        case 2:

        // set touch action
        this.touchAction = 'zooming';

        // get start touches
        this.startX0 = e.touches[0].pageX;
        this.startY0 = e.touches[0].pageY;
        this.startX1 = e.touches[1].pageX;
        this.startY1 = e.touches[1].pageY;

        // get start center
        this.startCenterX = (this.startX0 + this.startX1) / 2;
        this.startCenterY = (this.startY0 + this.startY1) / 2;

        // get start distance between fingers
        this.startDistance = Math.sqrt(Math.pow((this.startX1 - this.startX0), 2) + Math.pow((this.startY1 - this.startY0), 2));

        break;
      }
    }

    touchMove = (e) => {
      console.log('touchMove', e)
      return

      switch (this.touchAction) {
        case 'moving':

        // get end touches
        var endX0 = e.touches[0].pageX;
        var endY0 = e.touches[0].pageY;

        var tx = endX0 - this.startX0;
        var ty = endY0 - this.startY0;

        this.translateLayers(tx, ty);

        // calculate new translation points
        var translateX = this.getTranslateX() + tx;
        var translateY = this.getTranslateY() + ty;

        // set transform properties
        this.setTranslateX(translateX);
        this.setTranslateY(translateY);

        // apply transform
        this.applyTransform();

        // reset start touches
        this.startX0 = endX0;
        this.startY0 = endY0;

        break;

        case 'zooming':

        // get end touches
        var endX0 = e.touches[0].pageX;
        var endY0 = e.touches[0].pageY;
        var endX1 = e.touches[1].pageX;
        var endY1 = e.touches[1].pageY;

        // get end center
        var endCenterX = (endX0 + endX1) / 2;
        var endCenterY = (endY0 + endY1) / 2;

        // get end distance between fingers
        var endDistance = Math.sqrt(Math.pow((endX1 - endX0), 2) + Math.pow((endY1 - endY0), 2));

        // get distance difference
        var distanceDiff = endDistance / this.startDistance;

        // calculate scale and ratio
        var scale = this.getScale();
        var startScale = this.getStartScale();
        var newScale = startScale * distanceDiff;

        var ratio = newScale / scale;

        // get center position within image
        var mx = endCenterX - this.getImage().getX();
        var my = endCenterY - this.getImage().getY();

        // get center position within image after resize
        var nx = mx * ratio;
        var ny = my * ratio;

        // get translation difference because of zooming
        var zx = mx - nx;
        var zy = my - ny;

        // get translation difference because of moving
        var tx = endCenterX - this.startCenterX;
        var ty = endCenterY - this.startCenterY;

        // get total translation difference
        var tx = zx + tx;
        var ty = zy + ty;

        // calculate new translation
        var translateX = this.getTranslateX() + tx;
        var translateY = this.getTranslateY() + ty;

        // set transform properties
        this.setScale(newScale);
        this.setTranslateX(translateX);
        this.setTranslateY(translateY);

        // scale layers
        var box = this.getCanvas().getBox();
        var sx = endCenterX - box.x;
        var sy = endCenterY - box.y;
        this.scaleAndTranslateLayers(ratio, sx, sy, tx, ty);

        // apply transform
        this.applyTransform();

        // reset start touches
        this.startX0 = endX0;
        this.startY0 = endY0;
        this.startX1 = endX1;
        this.startY1 = endY1;

        // reset start center
        this.startCenterX = endCenterX;
        this.startCenterY = endCenterY;

        break;
      }
    }

    touchEnd = (e) => {
      return
      switch (this.touchAction) {
        case 'zooming':
        this.setStartScale(this.getScale());
        break;
      }

      this.touchAction = null;
    }
    */

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          fitImage={this.fitImage}
          moveToolMouseWheel={this.mouseWheel}
          moveToolMouseDown={this.mouseDown}
          moveToolMouseDrag={this.mouseDrag}
          moveToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
