import React, { Component } from 'react'
import Paper from './Paper/Paper'

// for development without internet connection
import 'material-design-icons/iconfont/material-icons.css'

import './App.css'

import MR_BUBBLES_JSON from './mr-bubbles.json'
import MR_BUBBLES_IMAGE_480 from './mr-bubbles-480.jpg'
import MR_BUBBLES_IMAGE_720 from './mr-bubbles-720.jpg'
import MR_BUBBLES_IMAGE_1080 from './mr-bubbles-1080.jpg'

const IMAGE_WIDTH = 1920
const IMAGE_HEIGHT = 870

const IMAGES = {
  480: MR_BUBBLES_IMAGE_480,
  720: MR_BUBBLES_IMAGE_720,
  1080: MR_BUBBLES_IMAGE_1080,
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageSize: 720,
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

  setImageSize = ({ size }) => {
    this.setState({ imageSize: size })
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
    const { imageSize, mounted } = this.state
    const box = this._box && this._box.getBoundingClientRect()
    return (
      <div className="App" ref={ref => this._box = ref}>
        {mounted &&
          <Paper
            initialData={MR_BUBBLES_JSON}
            image={IMAGES[imageSize]}
            imageWidth={IMAGE_WIDTH}
            imageHeight={IMAGE_HEIGHT}
            imageSize={imageSize}
            width={box.width}
            height={box.height}
            setImageSize={this.setImageSize}
          />}
      </div>
    )
  }

}

export default App
