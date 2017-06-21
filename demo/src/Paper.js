import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import {
  Circle,
  Layer,
  Path,
  //PointText,
  Raster,
  Rectangle,
  Tool,
  View,
} from 'react-paper-bindings'

import ReactLogo from './ReactLogo'

import PaperButtons from './PaperButtons'
import PaperButton from './PaperButton'

import withAnimation from './withAnimation'
import withTools from './withTools'
import withSelectTool from './withSelectTool'
import withMoveTool from './withMoveTool'
import withPenTool from './withPenTool'

import MR_BUBBLES from './mr-bubbles.jpg'

import './Paper.css'

class Paper extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      centerX: 0,
      centerY: 0,
      imageLoaded: false,
    }
  }

  imageLoaded = () => {
    this.setState({
      centerX: this.props.width/2,
      centerY: this.props.height/2,
      imageLoaded: true,
    })
  }

  save = () => {
    console.log('save');
  }

  render() {
    const {
      activeTool, animate, circles, paths, rectangles,
      width, height, rotation,
      sx, sy, tx, ty, x, y, zoom,
    } = this.props

    const {
      centerX, centerY, imageLoaded,
    } = this.state

    const viewProps = {
      activeTool, height, width,
      sx, sy, tx, ty, x, y, zoom,
      onWheel: this.props.moveToolMouseWheel,
    }

    return (
      <div className={'Paper'}>

        <View {...viewProps}>
          <Layer name={'Raster'}>
            <Raster
              fitToView={true}
              onLoad={this.imageLoaded}
              position={[centerX, centerY]}
              source={MR_BUBBLES}
            />
          </Layer>
          {imageLoaded &&
          <Layer name={'Path'}>
            {paths.map(path =>
              <Path
                {...path}
                reactKey={path.key}
                strokeColor={'red'}
                strokeScaling={false}
                strokeWidth={2}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'Circle'}>
            {circles.map(circle =>
              <Circle
                {...circle}
                reactKey={circle.key}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'Rectangle'}>
            {rectangles.map(rectangle =>
              <Rectangle
                {...rectangle}
                reactKey={rectangle.key}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'ReactLogo'}>
            {/*
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
            */}
            <ReactLogo
              rotation={rotation}
              x={centerX}
              y={centerY}
            />
          </Layer>}
          <Tool
            active={activeTool === 'select'}
            name={'select'}
            onKeyDown={this.props.selectToolKeyDown}
            onMouseDown={this.props.selectToolMouseDown}
            onMouseDrag={this.props.selectToolMouseDrag}
            onMouseUp={this.props.selectToolMouseUp}
          />
          <Tool
            active={activeTool === 'move'}
            name={'move'}
            onMouseDown={this.props.moveToolMouseDown}
            onMouseDrag={this.props.moveToolMouseDrag}
            onMouseUp={this.props.moveToolMouseUp}
          />
          <Tool
            active={activeTool === 'pen'}
            name={'pen'}
            onMouseDown={this.props.penToolMouseDown}
            onMouseDrag={this.props.penToolMouseDrag}
            onMouseUp={this.props.penToolMouseUp}
          />
          <Tool
            active={activeTool === 'circle'}
            name={'circle'}
            onMouseDown={this.props.addCircle}
          />
          <Tool
            active={activeTool === 'rectangle'}
            name={'rectangle'}
            onMouseDown={this.props.addRectangle}
          />
        </View>
        <PaperButtons>
          <PaperButton
            active={activeTool === 'select'}
            onClick={this.props.setTool}
            tool={'select'}>
            Select
          </PaperButton>
          <PaperButton
            active={activeTool === 'move'}
            onClick={this.props.setTool}
            tool={'move'}>
            Move
          </PaperButton>
          <PaperButton
            active={activeTool === 'pen'}
            onClick={this.props.setTool}
            tool={'pen'}>
            Pen
          </PaperButton>
          <PaperButton
            active={activeTool === 'circle'}
            onClick={this.props.setTool}
            tool={'circle'}>
            Circle
          </PaperButton>
          <PaperButton
            active={activeTool === 'rectangle'}
            onClick={this.props.setTool}
            tool={'rectangle'}>
            Rectangle
          </PaperButton>
          <PaperButton
            active={activeTool === 'undo'}
            disabled={!this.props.canUndo}
            onClick={this.props.undo}
            tool={'undo'}>
            Undo
          </PaperButton>
          <PaperButton
            active={activeTool === 'redo'}
            disabled={!this.props.canRedo}
            onClick={this.props.redo}
            tool={'redo'}>
            Redo
          </PaperButton>
          <PaperButton
            onClick={this.props.toggleAnimation}
            tool={'animation'}>
            {animate ? 'Stop animation' : 'Start animation'}
          </PaperButton>
          <PaperButton
            onClick={this.save}
            tool={'save'}>
            Save
          </PaperButton>
        </PaperButtons>
      </div>
    )
  }
}

export default compose(
  withMoveTool,
  withPenTool,
  withSelectTool,
  withTools,
  withAnimation,
)(Paper)
