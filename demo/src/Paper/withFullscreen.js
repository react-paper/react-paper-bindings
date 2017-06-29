import React, { Component } from 'react'

export default function withFullscreen(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        fullscreen: false,
      }
    }

    toggleFullscreen = () => {
      if (!this.state.fullscreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
    }

    fullScreenChange = () => {
      this.setState({ fullscreen: !this.state.fullscreen })
    }

    componentDidMount() {
      document.addEventListener('webkitfullscreenchange', this.fullScreenChange)
      document.addEventListener('mozfullscreenchange', this.fullScreenChange)
      document.addEventListener('fullscreenchange', this.fullScreenChange)
      document.addEventListener('MSFullscreenChange', this.fullScreenChange)
    }

    componentWillUnmount() {
      document.addEventListener('webkitfullscreenchange', this.fullScreenChange)
      document.addEventListener('mozfullscreenchange', this.fullScreenChange)
      document.addEventListener('fullscreenchange', this.fullScreenChange)
      document.addEventListener('MSFullscreenChange', this.fullScreenChange)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          fullscreen={this.state.fullscreen}
          toggleFullscreen={this.toggleFullscreen}
        />
      )
    }

  }

}
