import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'

import Item from './Item'

import './Layers.css'

export default class Layers extends Component {

  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: {},
    }
  }

  toggleExpanded = (id) => {
    const { expanded } = this.state
    this.setState({
      expanded: assign({}, expanded, {
        [id]: typeof expanded[id] === 'undefined' ? false : !expanded[id]
      })
    })
  }

  render() {
    const { layers } = this.props
    const { expanded } = this.state
    return (
      <div className={'Layers'}>
        <h2 className={'Layers__title'}>Layers</h2>
        <div className={'Layers__body'}>
          {layers.map(({ id, type, children }) =>
            <Item
              id={id}
              key={id}
              type={type}
              children={children}
              expanded={expanded}
              onClick={this.toggleExpanded}
            />
          )}
        </div>
      </div>
    )
  }

}
