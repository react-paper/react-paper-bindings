// @flow

import React, { Component } from 'react'

import { Layer, Line } from '../../src'

type Props = {
  width: number,
  height: number,
  size?: number,
}

class Grid extends Component<Props> {
  layer = null

  constructor(props: Props) {
    super(props)
    this.layer = React.createRef()
  }

  componentDidMount() {
    if (this.layer && this.layer.current) {
      this.layer.current.sendToBack()
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
      <Layer ref={this.layer}>
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

export default Grid
