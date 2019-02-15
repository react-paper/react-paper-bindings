// @flow

import React, { Component } from 'react'

import { View, Layer, Rectangle } from '../../src'
import Grid from './Grid'

import type { ElementRef } from 'react'

type Ref = {
  current: ElementRef<any> | null,
}

type Props = {
  width: number,
  height: number,
}

class Paper extends Component<Props> {
  mounted: boolean = false
  view: ?Ref = null

  constructor(props: Props) {
    super(props)
    this.view = React.createRef()
  }

  componentDidMount() {
    this.mounted = true
  }

  render() {
    const { width, height } = this.props
    return (
      <View ref={this.view} width={width} height={height}>
        <Grid width={width} height={height} />
        <Layer>
          <Rectangle
            center={[width/2, height/2]}
            fillColor={'green'}
            size={[240, 120]}
          />
        </Layer>
      </View>
    )
  }
}

export default Paper
