import React, { Component } from 'react'

export default function withHistory(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        historyIndex: 0,
        history: [],
      }
    }

    addHistory = (action, data) => {
      this.setState({
        historyIndex: this.state.historyIndex+1,
        history: [...this.state.history, { action, data }]
      })
    }

    undo = () => {
      console.log('undo');
    }

    redo = () => {
      console.log('redo');
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          activeTool={this.state.activeTool}
          setTool={this.setTool}
        />
      )
    }

  }

}
