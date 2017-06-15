import React, { Component } from 'react'
import PropTypes from 'prop-types'
import paper from 'paper'
import './Paper.css'

import PaperButtons from './PaperButtons'
import PaperButton from './PaperButton'
import ReactLogo from './ReactLogo'

import {
  View,
  Layer,
  Group,
  //Path,
  Circle,
  Ellipse,
  Rectangle,
  PointText,
  Tool,
} from 'react-paper-bindings'

const NUM_CIRCLES = 150

const COLORS = [
  'green','greenyellow','orange','brown','gold','fuchsia','cyan','chartreuse',
  'violet','purple','yellow','red','blue','grey','pink','magenta','orangered',
]

const getEventXY = (e) => ({
  x: (e.touches) ? e.touches[0].pageX : e.pageX,
  y: (e.touches) ? e.touches[0].pageY : e.pageY,
})

const getRandomInt = (min,max) =>
  Math.floor(Math.random()*(max-min+1))+min

const createCircle = (key, x, y) => ({
  key, center: [x, y],
  fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
  radius: getRandomInt(10,50),
})

const createRectangle = (key, x, y) => ({
  key, center: [x, y],
  fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
  size: getRandomInt(20,100),
})

const createCircles = (w, h) =>
  [...Array(NUM_CIRCLES).keys()].map(i =>
    createCircle(i, getRandomInt(0,w), getRandomInt(0,h)))

export default class Paper extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTool: 'move',
      animate: true,
      circles: [],
      centerX: 0,
      centerY: 0,
      rectangles: [],
      rotation: 0,
      cx: 0,   // center x for zoom
      cy: 0,   // center y for zoom
      dx: 0,   // delta x for pan
      dy: 0,   // delta y for pan
      x: 0,    // view x
      y: 0,    // view y
      zoom: 1, // view zoom
    }
    this.box = null
    this.point = null
    this.path = null
  }

  setTool = (activeTool) => {
    this.setState({ activeTool })
  }

  addCircle = (e) => {
    const { x, y } = e.point
    const { circles } = this.state
    this.setState({
      circles: [...circles, createCircle(circles.length+1, x, y)]
    })
  }

  addRectangle = (e) => {
    const { x, y } = e.point
    const { rectangles } = this.state
    this.setState({
      rectangles: [...rectangles, createRectangle(rectangles.length+1, x, y)]
    })
  }

  rotate = () => {
    this.setState({
      animate: requestAnimationFrame(this.rotate),
      rotation: this.state.rotation + .5,
    })
  }

  toggleAnimation = () => {
    if (this.state.animate) {
      this.stopAnimation()
    } else {
      this.startAnimation()
    }
  }

  startAnimation = () => {
    this.setState({
      animate: requestAnimationFrame(this.rotate),
    })
  }

  stopAnimation() {
    cancelAnimationFrame(this.state.animate)
    this.setState({ animate: false })
  }

  mouseWheel = (e) => {
    if (this.state.activeTool !== 'move' || !this.box) {
      return
    }

    const { x, y, zoom } = this.state
    const box = this.box.getBoundingClientRect()

    // calculate new zoom and ratio
    const newZoom = (e.wheelDelta || -e.deltaY) > 0 ? zoom * 1.1 : zoom / 1.1
    const ratio = newZoom / zoom

    // get mouse position within image
    const mx = e.pageX - x - box.left
    const my = e.pageY - y - box.top

    // get mouse position within image after resize
    const nx = mx * ratio
    const ny = my * ratio

    // get difference in mouse positions before and after resize
    const dx = mx - nx
    const dy = my - ny

    this.setState({
      cx: e.pageX - box.left,
      cy: e.pageY - box.top,
      x: x + dx,
      y: y + dy,
      zoom: newZoom,
    })
  }

  moveToolMouseDown = (e) => {
    this.point = e.point
    this.event = e.event
  }

  moveToolMouseDrag = (e) => {
    const { x, y } = this.state
    if (this.movePending) {
      return
    }
    this.movePending = true
    const d = this.point.subtract(e.point)
    const curr = getEventXY(e.event)
    const prev = getEventXY(this.event)
    this.setState({
      dx: -d.x,
      dy: -d.y,
      x: x + (curr.x - prev.x),
      y: y + (curr.y - prev.y),
    }, () => {
      this.movePending = false
      // do not set next point!
      this.event = e.event
    })
  }

  moveToolMouseUp = (e) => {
    this.point = null
    this.event = null
  }

  penToolMouseDown = (e) => {
    if (this.path) {
      this.path.selected = false
      this.path = null
    }
    this.path = new paper.Path({
      fullySelected: true,
      //segments: [e.point],
      strokeColor: 'red',
      strokeScaling: false,
      strokeWidth: 2,
    })
  }

  penToolMouseDrag = (e) => {
    if (this.path) {
      this.path.add(e.point)
    }
  }

  penToolMouseUp = (e) => {
    if (this.path) {
      this.path.simplify(10)
      this.path.fullySelected = true
      /*
      const path = this.path.segments.map(segment => {
        return {
          point:     { x: segment.point.x,     y: segment.point.y },
          handleIn:  { x: segment.handleIn.x,  y: segment.handleIn.y },
          handleOut: { x: segment.handleOut.x, y: segment.handleOut.y },
        }
      })
      console.log(JSON.stringify(path));
      */
    }
  }

  componentDidMount() {
    const { width, height } = this.box.getBoundingClientRect()
    this.setState({
      circles: createCircles(width, height),
      centerX: width/2,
      centerY: height/2,
    })
    if (this.state.animate) {
      this.startAnimation()
    }
  }

  componentWillUnmount() {
    if (this.state.animate) {
      this.stopAnimation()
    }
  }

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

      var dx = endX0 - this.startX0;
      var dy = endY0 - this.startY0;

      this.translateLayers(dx, dy);

      // calculate new translation points
      var translateX = this.getTranslateX() + dx;
      var translateY = this.getTranslateY() + dy;

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
      var dx = zx + tx;
      var dy = zy + ty;

      // calculate new translation
      var translateX = this.getTranslateX() + dx;
      var translateY = this.getTranslateY() + dy;

      // set transform properties
      this.setScale(newScale);
      this.setTranslateX(translateX);
      this.setTranslateY(translateY);

      // scale layers
      var box = this.getCanvas().getBox();
      var cx = endCenterX - box.x;
      var cy = endCenterY - box.y;
      this.scaleAndTranslateLayers(ratio, cx, cy, tx, ty);

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

  render() {
    const {
      width,
      height,
    } = this.props

    const {
      activeTool,
      animate,
      circles,
      centerX,
      centerY,
      rectangles,
      rotation,
      cx, cy,
      dx, dy,
      x, y,
      zoom,
    } = this.state

    const viewProps = {
      activeTool,
      width, height,
      cx, cy, dx, dy,
      x, y, zoom,
      onWheel: this.mouseWheel,
    }

    return (
      <div className={'Paper'} ref={ref => this.box = ref}>
        <View {...viewProps}>
          <Layer name={'circles'}>
            {circles.map(circle => <Circle {...circle} />)}
          </Layer>
          <Layer name={'rectangles'}>
            {rectangles.map(rectangle => <Rectangle {...rectangle} />)}
          </Layer>
          <Layer name={'logo'}>
            <Rectangle
              center={[centerX, centerY]}
              fillColor={'#222222'}
              opacity={0.8}
              size={[320, 120]}
            />
            <PointText
              content={' + Paper.js'}
              fillColor={'white'}
              fontFamily={'Courier New'}
              fontSize={30}
              fontWeight={'bold'}
              justification={'center'}
              point={[centerX+37, centerY+10]}
            />
            <ReactLogo
              rotation={rotation}
              x={centerX-100}
              y={centerY}
            />
          </Layer>
          <Layer name={'draw'} active={true}>
          </Layer>
          <Tool
            active={activeTool === 'move'}
            name={'move'}
            onMouseDown={this.moveToolMouseDown}
            onMouseDrag={this.moveToolMouseDrag}
            onMouseUp={this.moveToolMouseUp}
          />
          <Tool
            active={activeTool === 'pen'}
            name={'pen'}
            onMouseDown={this.penToolMouseDown}
            onMouseDrag={this.penToolMouseDrag}
            onMouseUp={this.penToolMouseUp}
          />
          <Tool
            active={activeTool === 'circle'}
            name={'circle'}
            onMouseDown={this.addCircle}
          />
          <Tool
            active={activeTool === 'rectangle'}
            name={'rectangle'}
            onMouseDown={this.addRectangle}
          />
        </View>
        <PaperButtons>
          <PaperButton
            active={activeTool === 'move'}
            onClick={this.setTool}
            tool={'move'}>
            Move
          </PaperButton>
          <PaperButton
            active={activeTool === 'pen'}
            onClick={this.setTool}
            tool={'pen'}>
            Pen
          </PaperButton>
          <PaperButton
            active={activeTool === 'circle'}
            onClick={this.setTool}
            tool={'circle'}>
            Circle
          </PaperButton>
          <PaperButton
            active={activeTool === 'rectangle'}
            onClick={this.setTool}
            tool={'rectangle'}>
            Rectangle
          </PaperButton>
          <PaperButton
            onClick={this.toggleAnimation}
            tool={'animation'}>
            {animate ? 'Stop animation' : 'Start animation'}
          </PaperButton>
        </PaperButtons>
      </div>
    )
  }
}
