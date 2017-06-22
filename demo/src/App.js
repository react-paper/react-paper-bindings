import React, { Component } from 'react'
import Paper from './Paper'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
  }

  handleResize = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    this.setState({ mounted: true })
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { mounted } = this.state
    const box = this._box && this._box.getBoundingClientRect()
    return (
      <div className="App" ref={ref => this._box = ref}>
        {mounted &&
          <Paper
            top={box.top}
            left={box.left}
            width={box.width}
            height={box.height-55}
          />}
      </div>
    )
  }

}

export default App
