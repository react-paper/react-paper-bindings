import React, { Component } from 'react'
import PropTypes from 'prop-types'
import paper from 'paper'
import './Paper.css'

import ToolButtons from './ToolButtons'
import ToolButton from './ToolButton'

import {
  View,
  Layer,
  Group,
  Path,
  Circle,
  Ellipse,
  Rectangle,
  PointText,
  Tool,
} from './react-paper-bindings'

const COLORS = [
  'red',
  'black',
  'green',
  'orange',
  'brown',
  'violet',
]

const SEGMENTS = JSON.parse('[{"point":{"x":484,"y":120},"handleIn":{"x":0,"y":0},"handleOut":{"x":18.977308308482463,"y":-37.95461661696493}},{"point":{"x":549,"y":125},"handleIn":{"x":-17.825939356897948,"y":-35.65187871379598},"handleOut":{"x":7.884957578851186,"y":15.7699151577024}},{"point":{"x":488,"y":196},"handleIn":{"x":8.849350288038295,"y":0},"handleOut":{"x":-7.516498095706652,"y":0}},{"point":{"x":463,"y":164},"handleIn":{"x":4.239613566449123,"y":6.359420349673655},"handleOut":{"x":-7.307810734692453,"y":-10.961716102038707}},{"point":{"x":437,"y":133},"handleIn":{"x":5.981165362327033,"y":11.962330724654095},"handleOut":{"x":-4.07301805833913,"y":-8.146036116678317}},{"point":{"x":434,"y":106},"handleIn":{"x":-4.053417030370952,"y":8.106834060741932},"handleOut":{"x":10.18742354746064,"y":-20.37484709492128}},{"point":{"x":485,"y":125},"handleIn":{"x":0,"y":-3.7218046005132663},"handleOut":{"x":0,"y":0}}]')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class Paper extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTool: 'move',
      animate: false,
      circles: [],
      rectangles: [],
      rotation: 0,
      cx: 0,
      cy: 0,
      dx: 0,
      dy: 0,
      x: 0,
      y: 0,
      zoom: 1,
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
    const circles = [...this.state.circles, {
      id: this.state.circles.length + 1,
      center: [x, y],
      fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
      radius: getRandomInt(10,60),
    }]
    this.setState({ circles })
  }

  addRectangle = (e) => {
    const { x, y } = e.point
    const size = getRandomInt(10,60)
    const rectangles = [...this.state.rectangles, {
      id: this.state.rectangles.length + 1,
      fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
      point: [x - (size / 2), y - (size / 2)],
      size: [size, size],
    }]
    this.setState({ rectangles })
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

  startAnimation() {
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
    const d = this.point.subtract(e.point)
    this.setState({
      dx: -d.x,
      dy: -d.y,
      x: x + (e.event.x - this.event.x),
      y: y + (e.event.y - this.event.y),
    })
    this.event = e.event
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
    if (this.state.animate) {
      this.startAnimation()
    }
  }

  componentWillUnmount() {
    if (this.state.animate) {
      this.stopAnimation()
    }
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
      rectangles,
      rotation,
      cx, cy, dx, dy,
      x, y, zoom,
    } = this.state

    const viewProps = {
      activeTool,
      width, height,
      cx, cy, dx, dy,
      x, y, zoom,
      onWheel: this.mouseWheel,
    }

    const centerX = width / 2
    const centerY = height / 2 - 25

    return (
      <div className={'Paper'} ref={ref => this.box = ref}>
        <View {...viewProps}>
          <Layer name={'circle'}>
            <Group>
              <Circle
                center={[centerX, centerY]}
                fillColor={'red'}
                radius={50}
                strokeColor={'black'}
                strokeScaling={false}
                strokeWidth={2}
              />
              <PointText
                content={'Paper.js'}
                fillColor={'black'}
                fontFamily={'Courier New'}
                fontSize={18}
                fontWeight={'bold'}
                justification={'center'}
                point={[centerX, centerY+3]}
              />
            </Group>
            {circles.map(circle =>
              <Circle key={circle.id} {...circle} />
            )}
          </Layer>
          <Layer name={'rectangles'}>
            <Rectangle
              fillColor={'blue'}
              point={[centerX - 40, centerY + 70]}
              size={[40,40]}
            />
            <Rectangle
              fillColor={'purple'}
              point={[centerX, centerY + 70]}
              size={[40,40]}
            />
            <Rectangle
              fillColor={'green'}
              point={[centerX - 40, centerY + 110]}
              size={[40,40]}
            />
            <Rectangle
              fillColor={'orange'}
              point={[centerX, centerY + 110]}
              size={[40,40]}
            />
            {rectangles.map(rectangle =>
              <Rectangle key={rectangle.id} {...rectangle} />
            )}
          </Layer>
          <Layer name={'logo'}>
            <Group rotation={rotation}>
              <Ellipse
                strokeWidth={2.5}
                strokeColor={'#61DAFB'}
                point={[centerX - 35, centerY + 98]}
                size={[70, 25]}
              />
              <Ellipse
                strokeWidth={2.5}
                strokeColor={'#61DAFB'}
                point={[centerX - 35, centerY + 98]}
                size={[70, 25]}
                rotation={120}
              />
              <Ellipse
                strokeWidth={2.5}
                strokeColor={'#61DAFB'}
                point={[centerX - 35, centerY + 98]}
                size={[70, 25]}
                rotation={240}
              />
              <Circle
                center={[centerX, centerY + 111]}
                fillColor={'#61DAFB'}
                radius={7}
              />
            </Group>
          </Layer>
          <Layer name={'path'}>
            <Path
              segments={SEGMENTS}
              strokeColor={'red'}
              strokeScaling={false}
              strokeWidth={2}
            />
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
        <ToolButtons>
          <ToolButton
            active={activeTool === 'move'}
            onClick={this.setTool}
            tool={'move'}>
            Move
          </ToolButton>
          <ToolButton
            active={activeTool === 'pen'}
            onClick={this.setTool}
            tool={'pen'}>
            Pen
          </ToolButton>
          <ToolButton
            active={activeTool === 'circle'}
            onClick={this.setTool}
            tool={'circle'}>
            Circle
          </ToolButton>
          <ToolButton
            active={activeTool === 'rectangle'}
            onClick={this.setTool}
            tool={'rectangle'}>
            Rectangle
          </ToolButton>
          <ToolButton
            onClick={this.toggleAnimation}
            tool={'animation'}>
            {animate ? 'Stop animation' : 'Start animation'}
          </ToolButton>
        </ToolButtons>
      </div>
    )
  }
}
