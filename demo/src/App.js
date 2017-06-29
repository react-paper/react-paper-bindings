import React, { Component } from 'react'
import Paper from './Paper'

import 'material-design-icons/iconfont/material-icons.css'
import './App.css'

//import MR_BUBBLES_IMAGE_SMALL from './mr-bubbles-480.jpg'
//import MR_BUBBLES_IMAGE_MEDIUM from './mr-bubbles-720.jpg'
import MR_BUBBLES_IMAGE_LARGE from './mr-bubbles-1080.jpg'
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
            image={MR_BUBBLES_IMAGE_LARGE}
            json={MR_BUBBLES_JSON}
            width={box.width}
            height={box.height}
          />}
      </div>
    )
  }

}

export default App
