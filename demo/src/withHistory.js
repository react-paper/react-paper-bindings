import React, { Component } from 'react'
import assign from 'object-assign'
import update from 'immutability-helper'

export default function withHistory(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        historyIndex: 0,
        history: [props.initialData],
      }
      this._nextId = 123
    }

    addItem = (type, item, callback) => {
      const nextItem = assign(item, { id: this._nextId })
      const prevHistory = this.getPrevHistory()
      const nextHistory = update(prevHistory, {
        [type]: { $push: [nextItem] }
      })
      this.addHistory(nextHistory, callback)
      this._nextId++
    }

    updateItem = (type, id, item, callback) => {
      const prevHistory = this.getPrevHistory()
      const itemIndex = prevHistory[type].findIndex(p => p.id === id)
      const prevItem = prevHistory[type][itemIndex]
      const nextItem = assign({}, prevItem, item)
      const nextHistory = update(prevHistory, {
        [type]: { [itemIndex]: { $set: nextItem } }
      })
      this.addHistory(nextHistory, callback)
    }

    removeItem = (type, id, callback) => {
      const prevHistory = this.getPrevHistory()
      const itemIndex = prevHistory[type].findIndex(p => p.id === id)
      const nextHistory = update(prevHistory, {
        [type]: { $splice: [[itemIndex, 1]] }
      })
      this.addHistory(nextHistory, callback)
    }

    addHistory = (nextHistory, callback) => {
      const historyIndex = this.state.historyIndex+1
      const history = [
        ...this.state.history.slice(0, historyIndex),
        nextHistory,
      ]
      this.setState({ historyIndex, history }, callback)
    }

    clearHistory = () => {
      this.setState({
        historyIndex: 0,
        history: [this.props.initialData],
      })
    }

    getPrevHistory = () => {
      return this.state.history[this.state.historyIndex]
    }

    undo = () => {
      const { historyIndex, history } = this.state
      if (historyIndex < 0) {
        return
      }
      this.setState({
        historyIndex: historyIndex - 1,
        items: history[historyIndex],
      })
    }

    redo = () => {
      const { historyIndex, history } = this.state
      this.setState({
        historyIndex: historyIndex + 1,
        items: history[historyIndex + 1],
      })
    }

    render() {
      const { historyIndex, history } = this.state
      return (
        <WrappedComponent
          {...this.props}

          data={history[historyIndex]}

          addItem={this.addItem}
          removeItem={this.removeItem}
          updateItem={this.updateItem}

          addHistory={this.addHistory}
          clearHistory={this.clearHistory}
          getPrevHistory={this.getPrevHistory}

          canUndo={historyIndex > 0}
          canRedo={history.length > 1 && historyIndex + 1 < history.length}

          undo={this.undo}
          redo={this.redo}
        />
      )
    }

  }

}
