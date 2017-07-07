import React, { Component } from 'react'

export default function withTools(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        activeTool: 'move',
      }
      this._prevTool = null
    }

    setTool = (activeTool) => {
      this.setState({ activeTool })
    }

    keyDown = (e) => {
      if (e.code === 'Space' && this.state.activeTool !== 'move') {
        this._prevTool = this.state.activeTool
        this.setState({ activeTool: 'move' })
      } else if (e.key === 'v') {
        this.setState({ activeTool: 'move' })
      } else if (e.key === 'a') {
        this.setState({ activeTool: 'select' })
      } else if (e.key === 'p') {
        this.setState({ activeTool: 'pen' })
      } else if (e.key === 'c') {
        this.setState({ activeTool: 'circle' })
      } else if (e.key === 'r') {
        this.setState({ activeTool: 'rectangle' })
      } else if (e.key === 'd') {
        this.setState({ activeTool: 'delete' })
      }
    }

    keyUp = (e) => {
      if (e.code === 'Space' && this.state.activeTool === 'move' && this._prevTool !== 'move') {
        this.setTool(this._prevTool)
        this._prevTool = null
      }
    }

    componentDidMount() {
      document.addEventListener('keydown', this.keyDown)
      document.addEventListener('keyup', this.keyUp)
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyDown)
      document.removeEventListener('keyup', this.keyUp)
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
