import React, { Component } from 'react'
import assign from 'object-assign'
import update from 'immutability-helper'
import { compose } from 'recompose'

import Paper from './Paper'

import withHistory from './withHistory'

class PaperEditor extends Component {

  constructor(props) {
    super(props)

    this._nextId = 10
  }

  addItem = (type, item, callback) => {
    const nextItem = assign(item, { id: this._nextId })
    const prevHistory = this.props.getPrevHistory()
    const nextHistory = update(prevHistory, {
      [type]: { $push: [nextItem] }
    })
    this.props.addHistory(nextHistory, callback)
    this._nextId++
  }

  updateItem = (type, id, item, callback) => {
    const prevHistory = this.props.getPrevHistory()
    const itemIndex = prevHistory[type].findIndex(p => p.id === id)
    const prevItem = prevHistory[type][itemIndex]
    const nextItem = assign({}, prevItem, item)
    const nextHistory = update(prevHistory, {
      [type]: { [itemIndex]: { $set: nextItem } }
    })
    this.props.addHistory(nextHistory, callback)
  }

  removeItem = (type, id, callback) => {
    const prevHistory = this.props.getPrevHistory()
    const itemIndex = prevHistory[type].findIndex(p => p.id === id)
    const nextHistory = update(prevHistory, {
      [type]: { $splice: [[itemIndex,1]] }
    })
    this.props.addHistory(nextHistory, callback)
  }

  resetView = () => {
    this.props.clearHistory()
  }

  render() {
    const { canUndo, canRedo, historyItem } = this.props
    const { Circle, Path, Rectangle } = historyItem
    return (
      <Paper
        {...this.props}

        addItem={this.addItem}
        updateItem={this.updateItem}
        removeItem={this.removeItem}
        resetView={this.resetView}

        canRedo={canRedo}
        canUndo={canUndo}
        redo={this.props.redo}
        undo={this.props.undo}

        circles={Circle}
        paths={Path}
        rectangles={Rectangle}
      />
    )
  }

}

export default compose(
  withHistory,
)(PaperEditor)
