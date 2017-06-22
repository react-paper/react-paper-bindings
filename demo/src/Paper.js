import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import {
  Circle, Layer, Path, Raster, Rectangle, Tool, View,
} from 'react-paper-bindings'

import ReactLogo from './ReactLogo'
import PaperButton from './PaperButton'
import PaperButtons from './PaperButtons'

import withAnimation from './withAnimation'
import withTools from './withTools'
import withMoveTool from './withMoveTool'
import withSelectTool from './withSelectTool'
import withPenTool from './withPenTool'
import withCircleTool from './withCircleTool'
import withRectangleTool from './withRectangleTool'

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
    console.log('TODO: export canvas');
  }

  render() {
    const {
      activeTool, animate,
      circles, paths, rectangles,
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
          <Layer name={'Path'} active={activeTool === 'pen'}>
            {paths.map(path =>
              <Path
                {...path}
                key={path.id}
                reactId={path.id}
                strokeColor={'red'}
                strokeScaling={false}
                strokeWidth={2}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'Circle'} active={activeTool === 'circle'}>
            {circles.map(circle =>
              <Circle
                {...circle}
                key={circle.id}
                reactId={circle.id}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'Rectangle'} active={activeTool === 'rectangle'}>
            {rectangles.map(rectangle =>
              <Rectangle
                {...rectangle}
                key={rectangle.id}
                reactId={rectangle.id}
              />
            )}
          </Layer>}
          {imageLoaded &&
          <Layer name={'ReactLogo'}>
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
            onMouseDown={this.props.circleToolMouseDown}
          />
          <Tool
            active={activeTool === 'rectangle'}
            name={'rectangle'}
            onMouseDown={this.props.rectangleToolMouseDown}
          />
        </View>
        <PaperButtons>
          <PaperButton
            active={activeTool === 'select'}
            onClick={this.props.setTool}
            title={'Select Tool'}
            tool={'select'}>
            <i className={'material-icons'}>touch_app</i>
          </PaperButton>
          <PaperButton
            active={activeTool === 'move'}
            onClick={this.props.setTool}
            title={'Move Tool'}
            tool={'move'}>
            <i className={'material-icons'}>pan_tool</i>
          </PaperButton>
          <PaperButton
            active={activeTool === 'pen'}
            onClick={this.props.setTool}
            title={'Pen Tool'}
            tool={'pen'}>
            <i className={'material-icons'}>create</i>
          </PaperButton>
          <PaperButton
            active={activeTool === 'circle'}
            onClick={this.props.setTool}
            title={'Circle Tool'}
            tool={'circle'}>
            <i className={'material-icons'}>radio_button_unchecked</i>
          </PaperButton>
          <PaperButton
            active={activeTool === 'rectangle'}
            onClick={this.props.setTool}
            title={'Rectangle Tool'}
            tool={'rectangle'}>
            <i className={'material-icons'}>check_box_outline_blank</i>
          </PaperButton>
          <span></span>
          <PaperButton
            active={activeTool === 'undo'}
            disabled={!this.props.canUndo}
            onClick={this.props.undo}
            title={'Undo'}
            tool={'undo'}>
            <i className={'material-icons'}>undo</i>
          </PaperButton>
          <PaperButton
            active={activeTool === 'redo'}
            disabled={!this.props.canRedo}
            onClick={this.props.redo}
            title={'Redo'}
            tool={'redo'}>
            <i className={'material-icons'}>redo</i>
          </PaperButton>
          <span></span>
          <PaperButton
            onClick={this.props.resetView}
            title={'Reset View'}
            tool={'reset'}>
            <i className={'material-icons'}>clear</i>
          </PaperButton>
          <PaperButton
            onClick={this.props.toggleAnimation}
            title={animate ? 'Stop Animation' : 'Start Animation'}
            tool={'animation'}>
            <i className={'material-icons'}>
              {animate ? 'pause' : 'play_arrow'}
            </i>
          </PaperButton>
          <span></span>
          <PaperButton
            onClick={this.save}
            title={'Save'}
            tool={'save'}>
            <i className={'material-icons'}>save</i>
          </PaperButton>
        </PaperButtons>
      </div>
    )
  }
}

export default compose(
  withCircleTool,
  withRectangleTool,
  withMoveTool,
  withPenTool,
  withSelectTool,
  withTools,
  withAnimation,
)(Paper)
