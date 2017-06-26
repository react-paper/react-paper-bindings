import React, { Component } from 'react'
import Paper from './Paper'

import './App.css'

const TOOLBAR_HEIGHT = 55

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
            top={box.top+TOOLBAR_HEIGHT}
            left={box.left}
            width={box.width}
            height={box.height-TOOLBAR_HEIGHT}
          />}
      </div>
    )
  }

}

export default App
