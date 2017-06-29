import React, { Component } from 'react'
import Paper from './Paper/Paper'

import 'material-design-icons/iconfont/material-icons.css'
import './App.css'

import MR_BUBBLES_IMAGE from './mr-bubbles-480.jpg'
//import MR_BUBBLES_IMAGE from './mr-bubbles-720.jpg'
//import MR_BUBBLES_IMAGE from './mr-bubbles-1080.jpg'
import MR_BUBBLES_JSON from './mr-bubbles.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
    this._box = null
    this._request = null
  }

  resizeWindow = () => {
    if (!this._request) {
      this._request = requestAnimationFrame(this.resizePaper)
    }
  }

  resizePaper = () => {
    this.forceUpdate()
    this._request = null
  }

  componentDidMount() {
    this.setState({ mounted: true })
    window.addEventListener('resize', this.resizeWindow)
  }

  componentWillUnmount() {
    if (this._request) {
      cancelAnimationFrame(this._request)
      this._request = null
    }
    window.removeEventListener('resize', this.resizeWindow)
  }

  render() {
    const { mounted } = this.state
    const box = this._box && this._box.getBoundingClientRect()
    return (
      <div className="App" ref={ref => this._box = ref}>
        {mounted &&
          <Paper
            initialData={MR_BUBBLES_JSON}
            image={MR_BUBBLES_IMAGE}
            imageWidth={1920}
            imageHeight={870}
            width={box.width}
            height={box.height}
          />}
      </div>
    )
  }

}

export default App
