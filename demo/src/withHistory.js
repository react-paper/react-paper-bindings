import React, { Component } from 'react'
import assign from 'object-assign'
import update from 'immutability-helper'

import { getRandomColor } from './helpers'

const INITIAL_HISTORY = {
  Path: [{
    id: 1,
    data: 'M409,376c9.48537,-18.97073 22.64623,-36.70472 35,-54c6.81891,-9.54647 16.54566,-16.09132 22,-27c12.18333,-24.36666 28.89145,-44.33717 44,-67c7.8837,-11.82556 21.03645,-20.05468 29,-32c7.71245,-11.56867 16.24862,-26.16574 28,-34c15.74335,-10.49557 26.68592,-32.34296 44,-41c15.00203,-7.50101 31.56514,-36.78257 48,-45c6.53795,-3.26897 13.43868,-5.71934 20,-9c8.59575,-4.29787 22.06135,5.46932 31,1c8.65355,-4.32677 23.19124,-13 34,-13',
  },{
    id: 4,
    data: 'M360.57028,156.22622c0,6.52326 0.11535,15.49756 -4.1422,19.75511c-0.40652,0.40652 -5.28665,7.77722 -4.77946,8.2844c0.88813,0.88813 4.42858,-0.66951 5.41672,0.31863c2.56738,2.56738 7.39992,20.32096 13.70113,14.01976c0.51647,-0.51647 -1.59315,-8.46143 -1.59315,-10.19619c0,-7.90174 -0.57504,-32.81897 -8.92166,-32.81897',
  }],
  Circle: [/*{
    id: 2,
    data: 'M362,365c0,-8.28427 6.71573,-15 15,-15c8.28427,0 15,6.71573 15,15c0,8.28427 -6.71573,15 -15,15c-8.28427,0 -15,-6.71573 -15,-15z',
    fillColor: getRandomColor(),
  }*/],
  Rectangle: [/*{
    id: 3,
    data: 'M358,132v-46h46v46z',
    fillColor: getRandomColor(),
  }*/],
}

export default function withHistory(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        historyIndex: 0,
        history: [INITIAL_HISTORY],
      }
      this._nextId = 10
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
        [type]: { $splice: [[itemIndex,1]] }
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
        history: [INITIAL_HISTORY],
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
          canRedo={history.length > 1 && historyIndex+1 < history.length}

          undo={this.undo}
          redo={this.redo}
        />
      )
    }

  }

}
