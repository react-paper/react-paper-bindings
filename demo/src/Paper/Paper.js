import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import assign from 'object-assign'
import pick from 'lodash.pick'
import randomInt from 'random-int'

import { Motion, spring } from 'react-motion'

import {
  Layer, Raster, Tool, View,
  Circle, Path, Rectangle, PointText, // eslint-disable-line no-unused-vars
} from 'react-paper-bindings'

import Loader from './Loader/Loader'
import Toolbar from './Toolbar/Toolbar'
import Menu from './Menu/Menu'
import Layers from './Layers/Layers'

import withHistory from './hoc/withHistory'
import withFullscreen from './hoc/withFullscreen'
import withTools from './hoc/withTools'
import withMoveTool from './hoc/withMoveTool'
import withSelectTool from './hoc/withSelectTool'
import withPenTool from './hoc/withPenTool'
import withCircleTool from './hoc/withCircleTool'
import withRectangleTool from './hoc/withRectangleTool'
import withDeleteTool from './hoc/withDeleteTool'

import './Paper.css'

class Paper extends Component {

  static propTypes = {
    image: PropTypes.any.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageSize: PropTypes.number.isRequired,
    initialData: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    activeTool: PropTypes.string.isRequired,
    activeLayer: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    selectedItem: PropTypes.number.isRequired,
    fitImage: PropTypes.func.isRequired,
    setTool: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    setImageSize: PropTypes.func.isRequired,
    selectToolKeyDown: PropTypes.func.isRequired,
    selectToolKeyUp: PropTypes.func.isRequired,
    selectToolMouseDown: PropTypes.func.isRequired,
    selectToolMouseDrag: PropTypes.func.isRequired,
    selectToolMouseUp: PropTypes.func.isRequired,
    moveToolMouseDown: PropTypes.func.isRequired,
    moveToolMouseDrag: PropTypes.func.isRequired,
    moveToolMouseUp: PropTypes.func.isRequired,
    moveToolMouseWheel: PropTypes.func.isRequired,
    penToolMouseDown: PropTypes.func.isRequired,
    penToolMouseDrag: PropTypes.func.isRequired,
    penToolMouseUp: PropTypes.func.isRequired,
    circleToolMouseDown: PropTypes.func.isRequired,
    rectangleToolMouseDown: PropTypes.func.isRequired,
    deleteToolMouseDown: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      loaded: false,
      showLayers: true,
      size: [randomInt(40,320),randomInt(40,320)],
      open: false,
    }
    this._view = null
  }

  save = () => {
    const json = this._view._scope.project.exportJSON()
    const svg = this._view._scope.project.exportSVG({ embedImages: false })
    console.log(json)
    console.log(svg)
  }

  toggleLayers = () => {
    this.setState({
      showLayers: !this.state.showLayers,
    })
  }

  imageLoaded = (image) => {
    this._loaded = true
    this.props.fitImage(image)
    this.setState({ imageLoaded: true, loaded: true })
  }

  componentWillUpdate(nextProps) {
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }
  }

  render() {
    const {
      activeTool, activeLayer, image, data,
      selectedItem, setTool, width, height,
    } = this.props

    const { loaded, imageLoaded, showLayers, } = this.state

    const toolbarProps = assign(pick(this.props, [
      'activeTool', 'animate', 'fullscreen', 'imageSize',
      'canUndo', 'canRedo', 'undo', 'redo', 'clearHistory',
      'setTool', 'setImageSize', 'toggleAnimation', 'toggleFullscreen',
    ]), {
      showLayers,
      save: this.save,
      toggleLayers: this.toggleLayers,
    })

    const layerProps = {
      data,
      activeLayer,
      selectedItem,
      selectItem: this.props.selectItem,
    }

    const menuProps = {
      activeTool,
      setTool,
      x: width / 2,
      y: height - 60,
      tools: [
        { tool: 'delete', icon: 'delete', title: 'Delete Tool (D)' },
        { tool: 'pen', icon: 'create', title: 'Pen Tool (P)' },
        { tool: 'select', icon: 'touch_app', title: 'Select Tool (A)' },
        { tool: 'move', icon: 'pan_tool', title: 'Move Tool (V)' },
        { tool: 'circle', icon: 'add_circle', title: 'Circle Tool (C)' },
        { tool: 'rectangle', icon: 'add_box', title: 'Rectangle Tool (R)' },
      ],
    }

    const viewProps = assign(
      pick(this.props, ['activeTool', 'activeLayer', 'width', 'height']),
      {
        ref: ref => this._view = ref,
        onWheel: this.props.moveToolMouseWheel,
        matrix: pick(this.props, ['sx', 'sy', 'tx', 'ty', 'x', 'y', 'zoom'])
      }
    )

    return (
      <div className={`Paper tool-${activeTool}`}>
        <Toolbar {...toolbarProps} />
        {loaded &&
          <Menu {...menuProps} />}
        {!imageLoaded &&
          <Loader color={'orange'} />}
        {loaded && showLayers &&
          <Layers {...layerProps} />}
        <View {...viewProps}>
          <Layer name={'raster'}>
            <Raster locked source={image} onLoad={this.imageLoaded} />
          </Layer>
          <Layer name={'rectangle'} visible={imageLoaded}>
            <Motion style={{size: spring(this.state.open ? 400 : 100)}}>
              {({size}) =>
                <Rectangle
                  center={[width/2,height/2]}
                  size={[size,size]}
                  opacity={0.8}
                  fillColor={'#ffffff'}
                  onClick={() => this.setState({ open: !this.state.open })}
                />
              }
            </Motion>
            <PointText
              point={[width/2-34,height/2+5]}
              content={'Click Me'}
              fillColor={'#000000'}
              fontSize={18}
              onClick={() => this.setState({ open: !this.state.open })}
            />
          </Layer>
          {data.map(({ id: layerId, type, children }) =>
            <Layer
              key={layerId}
              data={{ id: layerId, type }}
              visible={imageLoaded}
              active={layerId === activeLayer}>
              {children.map(({ id: itemId, type: Item, ...props }) =>
                <Item
                  key={itemId}
                  {...props}
                  data={{ id: itemId, type: Item }}
                  selected={(
                    (activeTool === 'select') &&
                    (itemId === selectedItem || layerId === selectedItem)
                  )}
                />
              )}
            </Layer>
          )}
          <Tool
            activeTool={activeTool}
            active={activeTool === 'select'}
            name={'select'}
            onKeyDown={this.props.selectToolKeyDown}
            onKeyUp={this.props.selectToolKeyUp}
            onMouseDown={this.props.selectToolMouseDown}
            onMouseDrag={this.props.selectToolMouseDrag}
            onMouseUp={this.props.selectToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'move'}
            name={'move'}
            onMouseDown={this.props.moveToolMouseDown}
            onMouseDrag={this.props.moveToolMouseDrag}
            onMouseUp={this.props.moveToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'pen'}
            name={'pen'}
            onMouseDown={this.props.penToolMouseDown}
            onMouseDrag={this.props.penToolMouseDrag}
            onMouseUp={this.props.penToolMouseUp}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'circle'}
            name={'circle'}
            onMouseDown={this.props.circleToolMouseDown}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'rectangle'}
            name={'rectangle'}
            onMouseDown={this.props.rectangleToolMouseDown}
          />
          <Tool
            activeTool={activeTool}
            active={activeTool === 'delete'}
            name={'delete'}
            onMouseDown={this.props.deleteToolMouseDown}
          />
        </View>
      </div>
    )
  }
}

export default compose(
  withHistory,
  withFullscreen,
  withTools,
  withMoveTool,
  withSelectTool,
  withPenTool,
  withCircleTool,
  withRectangleTool,
  withDeleteTool,
)(Paper)
