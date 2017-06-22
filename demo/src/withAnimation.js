import React, { Component } from 'react'

export default function withAnimation(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        animate: true,
        rotation: 0,
      }
    }

    rotate = () => {
      this.setState({
        animate: requestAnimationFrame(this.rotate),
        rotation: this.state.rotation + .5,
      })
    }

    toggleAnimation = () => {
      if (this.state.animate) {
        this.stopAnimation()
      } else {
        this.startAnimation()
      }
    }

    startAnimation = () => {
      this.setState({
        animate: requestAnimationFrame(this.rotate),
      })
    }

    stopAnimation = () => {
      cancelAnimationFrame(this.state.animate)
      this.setState({ animate: false })
    }

    componentDidMount() {
      if (this.state.animate) {
        this.startAnimation()
      }
    }

    componentWillUnmount() {
      if (this.state.animate) {
        this.stopAnimation()
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          toggleAnimation={this.toggleAnimation}
          startAnimation={this.startAnimation}
          stopAnimation={this.stopAnimation}
        />
      )
    }

  }

}
