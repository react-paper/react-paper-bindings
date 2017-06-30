import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Menu from './Menu/Menu'
import MenuItem from './Menu/Item'

import './Toolbar.css'

const Toolbar = (props) => {
  const { activeTool, fullscreen, imageSize, showLayers } = props
  return (
    <div className={'Toolbar'}>
      <Button
        tool={'move'}
        title={'Move Tool'}
        active={activeTool === 'move'}
        onClick={props.setTool}>
        <i className={'material-icons'}>pan_tool</i>
      </Button>
      <Button
        tool={'select'}
        title={'Select Tool'}
        active={activeTool === 'select'}
        onClick={props.setTool}>
        <i className={'material-icons'}>touch_app</i>
      </Button>
      <Button
        tool={'pen'}
        title={'Pen Tool'}
        active={activeTool === 'pen'}
        onClick={props.setTool}>
        <i className={'material-icons'}>create</i>
      </Button>
      <Button
        tool={'circle'}
        title={'Circle Tool'}
        active={activeTool === 'circle'}
        onClick={props.setTool}>
        <i className={'material-icons'}>add_circle</i>
      </Button>
      <Button
        tool={'rectangle'}
        title={'Rectangle Tool'}
        active={activeTool === 'rectangle'}
        onClick={props.setTool}>
        <i className={'material-icons'}>add_box</i>
      </Button>
      <Button
        tool={'delete'}
        title={'Delete Tool'}
        active={activeTool === 'delete'}
        onClick={props.setTool}>
        <i className={'material-icons'}>delete</i>
      </Button>
      <span></span>
      <Button
        tool={'undo'}
        title={'Undo'}
        active={activeTool === 'undo'}
        disabled={!props.canUndo}
        onClick={props.undo}>
        <i className={'material-icons'}>undo</i>
      </Button>
      <Button
        tool={'redo'}
        title={'Redo'}
        active={activeTool === 'redo'}
        disabled={!props.canRedo}
        onClick={props.redo}>
        <i className={'material-icons'}>redo</i>
      </Button>
      <span></span>
      <Button
        tool={'reset'}
        title={'Reset View'}
        onClick={props.clearHistory}
        disabled={!props.canRedo && !props.canUndo}>
        <i className={'material-icons'}>clear</i>
      </Button>
      <Menu offset={'0 -8'} target={
        <Button title={'Image Size'}>
          <i className={'material-icons'}>photo_size_select_large</i>
        </Button>
      }>
        <MenuItem onClick={props.setImageSize} size={480}>
          <i className={'material-icons'}>
            {imageSize === 480 ? 'radio_button_checked' : 'radio_button_unchecked'}
          </i>
          <span>480p</span>
        </MenuItem>
        <MenuItem onClick={props.setImageSize} size={720}>
          <i className={'material-icons'}>
            {imageSize === 720 ? 'radio_button_checked' : 'radio_button_unchecked'}
          </i>
          <span>720p</span>
        </MenuItem>
        <MenuItem onClick={props.setImageSize} size={1080}>
          <i className={'material-icons'}>
            {imageSize === 1080 ? 'radio_button_checked' : 'radio_button_unchecked'}
          </i>
          <span>1080p</span>
        </MenuItem>
      </Menu>
      <Button
        tool={'layers'}
        title={showLayers ? 'Hide Layers' : 'Show Layers'}
        active={activeTool === 'layers'}
        onClick={props.toggleLayers}>
        <i className={'material-icons'}>
          {showLayers ? 'layers' : 'layers_clear'}
        </i>
      </Button>
      <Button
        tool={'fullscreen'}
        title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        onClick={props.toggleFullscreen}>
        <i className={'material-icons'}>
          {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
        </i>
      </Button>
      <span></span>
      <Button
        tool={'save'}
        title={'Save'}
        onClick={props.save}
        disabled={!props.canUndo}>
        <i className={'material-icons'}>save</i>
      </Button>
      <span></span>
      <a title={'Fork me on GitHub'} href={'https://github.com/HriBB/react-paper-bindings'}>
        <svg width="22" height="22" version="1.1" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </div>
  )
}

Toolbar.propTypes = {
  activeTool: PropTypes.string,
  canUndo: PropTypes.bool,
  canRedo: PropTypes.bool,
  fullscreen: PropTypes.bool,
  imageSize: PropTypes.number,
  showLayers: PropTypes.bool,
  save: PropTypes.func,
  setTool: PropTypes.func,
  undo: PropTypes.func,
  redo: PropTypes.func,
  clearHistory: PropTypes.func,
  toggleFullscreen: PropTypes.func,
  toggleLayers: PropTypes.func,
  setImageSize: PropTypes.func,
}

export default Toolbar
