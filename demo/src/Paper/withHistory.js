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
      this._id = 123
    }

    addItem = (layer, data) => {
      const history = this.getPrevHistory()
      const layerIndex = history.findIndex(l => l.id === layer.data.id)
      const nextData = assign(data, { id: this._id })
      const nextHistory = update(history, {
        [layerIndex]: { children: { $push: [nextData] } }
      })
      this.addHistory(nextHistory)
      this._id++
    }

    updateItem = (item, data) => {
      const history = this.getPrevHistory()
      const layerIndex = history.findIndex(l => l.id === item.layer.data.id)
      const children = history[layerIndex].children
      const itemIndex = children.findIndex(i => i.id === item.data.id)
      const nextData = assign({}, children[itemIndex], data)
      const nextHistory = update(history, {
        [layerIndex]: { children: { [itemIndex]: { $set: nextData } } }
      })
      this.addHistory(nextHistory)
    }

    removeItem = (item) => {
      const history = this.getPrevHistory()
      const layerIndex = history.findIndex(l => l.id === item.layer.data.id)
      const children = history[layerIndex].children
      const itemIndex = children.findIndex(i => i.id === item.data.id)
      const nextHistory = update(history, {
        [layerIndex]: { children: { $splice: [[itemIndex, 1]] } }
      })
      this.addHistory(nextHistory)
    }

    addHistory = (nextHistory) => {
      const historyIndex = this.state.historyIndex+1
      const history = [
        ...this.state.history.slice(0, historyIndex),
        nextHistory,
      ]
      this.setState({ historyIndex, history })
    }

    getPrevHistory = () => {
      return this.state.history[this.state.historyIndex]
    }

    clearHistory = () => {
      this.setState({
        historyIndex: 0,
        history: [this.props.initialData],
      })
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

          canUndo={historyIndex > 0}
          canRedo={history.length > 1 && historyIndex + 1 < history.length}

          undo={this.undo}
          redo={this.redo}
          clearHistory={this.clearHistory}
        />
      )
    }

  }

}
