import React, { Component } from 'react'
import PaperEditor from './PaperEditor'

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
          <PaperEditor
            height={box.height}
            left={box.left}
            top={box.top}
            width={box.width}
          />}
      </div>
    )
  }

}

export default App
