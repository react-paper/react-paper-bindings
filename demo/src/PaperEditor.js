import React, { Component } from 'react'
import assign from 'object-assign'
import update from 'immutability-helper'

import Paper from './Paper'

import {
  createCircle,
  createCircles,
  createRectangle,
  createRectangles,
} from './helpers'

export default class PaperEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      historyIndex: 0,
      history: [{
        Circle: createCircles(),
        Path: [{
          key: 0,
          data: 'M67,458c17.70274,-23.60366 31.86332,-50.00864 49,-74c21.99563,-30.79388 87.74155,-61.8277 118,-82c11.91742,-7.94495 35,-29.79657 35,-44',
        },{
          key: 1,
          data: 'M473,471c0,-8.60042 -6.89527,-16.89527 -13,-23c-2.85994,-2.85994 -1.83839,-9.83839 -4,-12c-8.30014,-8.30014 -13.42662,-24.71331 -26,-31c-11.03326,-5.51663 -49.59207,5.20396 -62,-1c-12.95194,-6.47597 -11.59322,-17.18643 -17,-28c-2.54684,-5.09367 2.7402,-16.2598 -1,-20c-2.40586,-2.40586 -11.50202,4 -14,4c-12.31077,0 -45.56296,14.43704 -57,3c-22.05655,-22.05655 -8,-66.20936 -8,-95',
        }],
        Rectangle: createRectangles(),
      }],
    }
    this._key = 1
  }

  // history

  addHistory(nextHistory, callback) {
    const historyIndex = this.state.historyIndex+1
    const history = [
      ...this.state.history.slice(0, historyIndex),
      nextHistory,
    ]
    this.setState({ historyIndex, history }, callback)
  }

  getPrevHistory() {
    return this.state.history[this.state.historyIndex]
  }

  undo = () => {
    const { historyIndex, history } = this.state
    if (historyIndex < 0) {
      return
    }
    this.setState({
      historyIndex: historyIndex-1,
      items: history[historyIndex],
    })
  }

  redo = () => {
    const { historyIndex, history } = this.state
    this.setState({
      historyIndex: historyIndex+1,
      items: history[historyIndex+1],
    })
  }

  // path

  addPath = (path, callback) => {
    const prevHistory = this.getPrevHistory()
    const nextHistory = update(prevHistory, {
      Path: { $push: [assign(path, { key: this._key })] }
    })
    this.addHistory(nextHistory, callback)
    this._key++
  }

  updatePath = (key, path, callback) => {
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Path.findIndex(p => p.key === key)
    const prevPath = prevHistory.Path[index]
    const nextPath = assign({}, prevPath, path)
    const nextHistory = update(prevHistory, {
      Path: {
        [index]: { $set: nextPath }
      }
    })
    this.addHistory(nextHistory, callback)
  }

  removePath = (key, callback) => {
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Path.findIndex(p => p.key === key)
    const nextHistory = update(prevHistory, {
      Path: { $splice: [[index,1]] }
    })
    this.addHistory(nextHistory, callback)
  }

  // circle

  addCircle = (e) => {
    const { x, y } = e.point
    const prevHistory = this.getPrevHistory()
    const nextHistory = update(prevHistory, {
      Circle: { $push: [createCircle(this._key, x, y)] }
    })
    this.addHistory(nextHistory)
    this._key++
  }

  updateCircle = (key, circle, callback) => {
    console.log('updateCircle', circle);
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Circle.findIndex(p => p.key === key)
    const prevCircle = prevHistory.Circle[index]
    const nextCircle = assign({}, prevCircle, circle)
    console.log('prev', prevCircle.center, 'next', nextCircle.center);
    const nextHistory = update(prevHistory, {
      Circle: {
        [index]: { $set: nextCircle }
      }
    })
    this.addHistory(nextHistory, callback)
  }

  removeCircle = (key, callback) => {
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Circle.findIndex(p => p.key === key)
    const nextHistory = update(prevHistory, {
      Circle: { $splice: [[index,1]] }
    })
    this.addHistory(nextHistory, callback)
  }

  // rectangle

  addRectangle = (e) => {
    const { x, y } = e.point
    const prevHistory = this.getPrevHistory()
    const nextHistory = update(prevHistory, {
      Rectangle: { $push: [createRectangle(this._key, x, y)] }
    })
    this.addHistory(nextHistory)
    this._key++
  }

  updateRectangle = (key, rectangle, callback) => {
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Rectangle.findIndex(p => p.key === key)
    const prevRectangle = prevHistory.Rectangle[index]
    const nextRectangle = assign({}, prevRectangle, rectangle)
    const nextHistory = update(prevHistory, {
      Rectangle: {
        [index]: { $set: nextRectangle }
      }
    })
    this.addHistory(nextHistory, callback)
  }

  removeRectangle = (key, callback) => {
    const prevHistory = this.getPrevHistory()
    const index = prevHistory.Rectangle.findIndex(p => p.key === key)
    const nextHistory = update(prevHistory, {
      Rectangle: { $splice: [[index,1]] }
    })
    this.addHistory(nextHistory, callback)
  }

  componentDidMount() {
    this.setState({ mounted: true })
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { historyIndex, history } = this.state
    const { Circle, Path, Rectangle } = history[historyIndex]
    return (
      <Paper
        {...this.props}
        addCircle={this.addCircle}
        addPath={this.addPath}
        addRectangle={this.addRectangle}
        canUndo={historyIndex > 0}
        canRedo={history.length > 1 && historyIndex+1 < history.length}
        circles={Circle}
        paths={Path}
        rectangles={Rectangle}
        removeCircle={this.removeCircle}
        removePath={this.removePath}
        removeRectangle={this.removeRectangle}
        redo={this.redo}
        undo={this.undo}
        updateCircle={this.updateCircle}
        updatePath={this.updatePath}
        updateRectangle={this.updateRectangle}
      />
    )
  }

}
