import React, { Component } from 'react'

export default function withTools(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        activeTool: 'select',
      }
      this._prevTool
    }

    setTool = (activeTool) => {
      console.log('setTool', activeTool)
      this.setState({ activeTool })
    }

    keyDown = (e) => {
      const { key, code } = e
      if (code === 'Space' && this.state.activeTool !== 'move') {
        this._prevTool = this.state.activeTool
        this.setTool('move')
      } else if (key === 'm' || key === 'v') {
        this.setTool('move')
      } else if (key === 'p' || key === 'b') {
        this.setTool('pen')
      } else if (key === 'd' || key === 'e') {
        this.setTool('delete')
      } else if (key === 'a' || key === 's') {
        this.setTool('select')
      } else if (key === 'c') {
        this.setTool('circle')
      } else if (key === 'r') {
        this.setTool('rectangle')
      }
    }

    keyUp = (e) => {
      const { key, code } = e
      if (code === 'Space' && this.state.activeTool === 'move' && this._prevTool !== 'move') {
        this.setTool(this._prevTool)
        this._prevTool = null
      }
    }

    componentDidMount() {
      document.addEventListener('keypress', this.keyPress)
      document.addEventListener('keydown', this.keyDown)
      document.addEventListener('keyup', this.keyUp)
    }

    componentWillUnmount() {
      document.removeEventListener('keypress', this.keyPress)
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
