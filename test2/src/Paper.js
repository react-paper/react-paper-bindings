import React, { Component } from 'react'

import { View, Layer, Line, Rectangle } from 'react-paper-bindings'

const width = 600
const height = 400

class Grid extends Component {
  componentDidMount() {
    if (this.ref) {
      console.log(this.ref)
    }
  }

  render() {
    const { width, height, size = 20 } = this.props

    const vertical = []
    const horizontal = []

    const wlen = Math.round(width / size)
    const hlen = Math.round(height / size)
    
    for (let i = 0; i <= wlen; i++) {
      const x = i * size
      vertical.push({
        id: x,
        from: [x, 0],
        to: [x, height],
      })
    }
    
    for (let i = 0; i <= hlen; i++) {
      const y = i * size
      horizontal.push({
        id: y,
        from: [0, y],
        to: [width, y],
      })
    }

    return (
      <Layer ref={ref => this.ref = ref}>
        {vertical.map(({ id, from, to }) =>
          <Line key={id} from={from} to={to} strokeColor={'red'} />
        )}
        {horizontal.map(({ id, from, to }) =>
          <Line key={id} from={from} to={to} strokeColor={'red'} />
        )}
      </Layer>
    )
  }
}

class Box extends Component {
  componentDidMount() {
    if (this.ref) {
      console.log(this.ref)
      this.ref.bringToFront()
      setTimeout(() => {
      }, 1500)
    }
  }

  render() {
    const { width, height } = this.props
    return (
      <Layer ref={ref => this.ref = ref}>
        <Rectangle
          center={[width/2, height/2]}
          fillColor={'green'}
          size={[240, 120]}
        />
      </Layer>
    )
  }
}

class Paper extends Component {
  render() {
    return (
      <View width={width} height={height}>
        <Box width={width} height={height} />
        <Grid width={width} height={height} />
      </View>
    )
  }
}

export default Paper
