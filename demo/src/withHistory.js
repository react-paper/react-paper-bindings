import React, { Component } from 'react'

import { getRandomColor } from './helpers'

const INITIAL_HISTORY = {
  Circle: [{
    id: 1,
    data: 'M257,147c0,-8.28427 6.71573,-15 15,-15c8.28427,0 15,6.71573 15,15c0,8.28427 -6.71573,15 -15,15c-8.28427,0 -15,-6.71573 -15,-15z',
    fillColor: getRandomColor(),
  },{
    id: 2,
    data: 'M330,156c0,-10.49341 8.50659,-19 19,-19c10.49341,0 19,8.50659 19,19c0,10.49341 -8.50659,19 -19,19c-10.49341,0 -19,-8.50659 -19,-19z',
    fillColor: getRandomColor(),
  },{
    id: 3,
    data: 'M460,164c0,-8.83656 7.16344,-16 16,-16c8.83656,0 16,7.16344 16,16c0,8.83656 -7.16344,16 -16,16c-8.83656,0 -16,-7.16344 -16,-16z',
    fillColor: getRandomColor(),
  }],
  Path: [{
    id: 4,
    data: 'M67,458c17.70274,-23.60366 31.86332,-50.00864 49,-74c21.99563,-30.79388 87.74155,-61.8277 118,-82c11.91742,-7.94495 35,-29.79657 35,-44',
  },{
    id: 5,
    data: 'M473,471c0,-8.60042 -6.89527,-16.89527 -13,-23c-2.85994,-2.85994 -1.83839,-9.83839 -4,-12c-8.30014,-8.30014 -13.42662,-24.71331 -26,-31c-11.03326,-5.51663 -49.59207,5.20396 -62,-1c-12.95194,-6.47597 -11.59322,-17.18643 -17,-28c-2.54684,-5.09367 2.7402,-16.2598 -1,-20c-2.40586,-2.40586 -11.50202,4 -14,4c-12.31077,0 -45.56296,14.43704 -57,3c-22.05655,-22.05655 -8,-66.20936 -8,-95',
  },{
    id: 6,
    data: 'M593,488c0,-23.52691 -19.74074,-72.82716 -41,-87c-20.2564,-13.50426 -48.44179,-16.16269 -63,-38c-5.01283,-7.51924 -12.16828,-13.75242 -17,-21c-7.21977,-10.82965 -9.53526,-23.07051 -15,-34c-2.38861,-4.77723 0,-29.28343 0,-36c0,-1.41126 0.671,-3 -1,-3',
  }],
  Rectangle: [{
    id: 7,
    data: 'M471,621v-26h26v26z',
    fillColor: getRandomColor(),
  },{
    id: 8,
    data: 'M404.5,638.5v-37h37v37z',
    fillColor: getRandomColor(),
  },{
    id: 9,
    data: 'M353,633v-40h40v40z',
    fillColor: getRandomColor(),
  }],
}

export default function withHistory(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        historyIndex: 0,
        history: [INITIAL_HISTORY],
      }
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
          addHistory={this.addHistory}
          clearHistory={this.clearHistory}
          canRedo={history.length > 1 && historyIndex+1 < history.length}
          canUndo={historyIndex > 0}
          getPrevHistory={this.getPrevHistory}
          historyItem={history[historyIndex]}
          redo={this.redo}
          undo={this.undo}
        />
      )
    }

  }

}
