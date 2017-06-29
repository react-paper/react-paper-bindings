import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import assign from 'object-assign'
import pick from 'lodash.pick'

import {
  Circle, Layer, Path, Raster, Rectangle, Tool, View,
} from 'react-paper-bindings'

import Toolbar from './Toolbar/Toolbar'
import Layers from './Layers/Layers'

import withHistory from './withHistory'
import withFullscreen from './withFullscreen'
import withTools from './withTools'
import withMoveTool from './withMoveTool'
import withSelectTool from './withSelectTool'
import withPenTool from './withPenTool'
import withCircleTool from './withCircleTool'
import withRectangleTool from './withRectangleTool'
import withDeleteTool from './withDeleteTool'

import './Paper.css'

class Paper extends Component {

  static propTypes = {
    image: PropTypes.any.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    initialData: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      showLayers: true,
    }
    this._view = null
  }

  save = () => {
    const json = this._view._scope.project.exportJSON();
    const svg = this._view._scope.project.exportSVG({ embedImages: false });
    console.log(json);
    console.log(svg);
  }

  toggleLayers = () => {
    this.setState({
      showLayers: !this.state.showLayers,
    })
  }

  imageLoaded = (image) => {
    this.props.fitImage(image)
    this.setState({ imageLoaded: true })
  }

  render() {
    const { activeTool,  image, data } = this.props
    const { imageLoaded, showLayers } = this.state

    const toolbarProps = assign(pick(this.props, [
      'activeTool','animate','fullscreen',
      'canUndo','canRedo', 'undo','redo', 'clearHistory',
      'setTool','toggleAnimation','toggleFullscreen',
    ]), {
      showLayers,
      save: this.save,
      toggleLayers: this.toggleLayers,
    })

    const viewProps = assign(pick(this.props, [
      'activeTool', 'width', 'height',
      'sx', 'sy', 'tx', 'ty', 'x', 'y', 'zoom',
    ]), {
      ref: ref => this._view = ref,
      onWheel: this.props.moveToolMouseWheel,
    })

    return (
      <div className={'Paper'}>
        <Toolbar {...toolbarProps} />
        {showLayers && <Layers layers={data} />}
        <View {...viewProps}>
          <Layer>
            <Raster locked source={image} onLoad={this.imageLoaded} />
          </Layer>
          {data.map(({ id, type, children }) =>
            <Layer key={id} data={{ id, type }} visible={imageLoaded}>
              {children.map(({ id, type: Item, data, ...rest }) =>
                <Item key={id} {...rest} data={{ id, type }} />
              )}
            </Layer>
          )}
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
          <Tool
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
  withPenTool,
  withMoveTool,
  withSelectTool,
  withCircleTool,
  withRectangleTool,
  withDeleteTool,
)(Paper)
