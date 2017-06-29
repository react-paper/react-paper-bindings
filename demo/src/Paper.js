import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import PaperToolbar from './PaperToolbar'
import PaperTree from './PaperTree'
import PaperView from './PaperView'

import withHistory from './withHistory'
import withAnimation from './withAnimation'
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      showLayers: false,
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
    const {
      activeTool, animate, fullscreen, canUndo, canRedo,
      width, height, json: items, sx, sy, tx, ty, x, y, zoom,
    } = this.props

    const toolbarProps = {
      activeTool, animate, fullscreen, canUndo, canRedo,
      showLayers: this.state.showLayers,
      save: this.save,
      setTool: this.props.setTool,
      undo: this.props.undo,
      redo: this.props.redo,
      clearHistory: this.props.clearHistory,
      toggleLayers: this.toggleLayers,
      toggleAnimation: this.props.toggleAnimation,
      toggleFullscreen: this.props.toggleFullscreen,
    }

    const treeProps = {
      items,
    }

    const viewProps = {
      activeTool, width, height, items,
      sx, sy, tx, ty, x, y, zoom,
      viewRef: ref => this._view = ref,
      imageLoaded: this.state.imageLoaded,
      onImageLoad: this.imageLoaded,
      onWheel: this.props.moveToolMouseWheel,
      selectToolKeyDown: this.props.selectToolKeyDown,
      selectToolMouseDown: this.props.selectToolMouseDown,
      selectToolMouseDrag: this.props.selectToolMouseDrag,
      selectToolMouseUp: this.props.selectToolMouseUp,
      moveToolMouseDown: this.props.moveToolMouseDown,
      moveToolMouseDrag: this.props.moveToolMouseDrag,
      moveToolMouseUp: this.props.moveToolMouseUp,
      penToolMouseDown: this.props.penToolMouseDown,
      penToolMouseDrag: this.props.penToolMouseDrag,
      penToolMouseUp: this.props.penToolMouseUp,
      circleToolMouseDown: this.props.circleToolMouseDown,
      rectangleToolMouseDown: this.props.rectangleToolMouseDown,
      deleteToolMouseDown: this.props.deleteToolMouseDown,
    }

    return (
      <div className={'Paper'}>
        <PaperToolbar {...toolbarProps} />
        {this.state.showLayers && <PaperTree {...treeProps} />}
        <PaperView {...viewProps} />
      </div>
    )
  }
}

export default compose(
  withHistory,
  withAnimation,
  withFullscreen,
  withTools,
  withPenTool,
  withMoveTool,
  withSelectTool,
  withCircleTool,
  withRectangleTool,
  withDeleteTool,
)(Paper)
