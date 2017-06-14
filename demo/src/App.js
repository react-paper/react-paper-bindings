import React, { Component } from 'react'
import Paper from './Paper/Paper'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { mounted: false }
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
    const box = this.box && this.box.getBoundingClientRect()
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Paper.js bindings for React</h2>
        </div>
        <div className="App-content" ref={ref => this.box = ref}>
          {mounted && <Paper width={box.width} height={box.height} />}
        </div>
      </div>
    )
  }

}

export default App
