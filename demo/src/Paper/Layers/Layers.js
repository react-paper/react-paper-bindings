import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'

import Item from './Item'

import './Layers.css'

export default class Layers extends Component {

  static propTypes = {
    activeLayer: PropTypes.bool,
    data: PropTypes.array.isRequired,
    selectedItem: PropTypes.number,
    selectItem: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: {},
    }
  }

  handleArrowClick = ({ id }) => {
    const { expanded } = this.state
    this.setState({
      expanded: assign({}, expanded, {
        [id]: typeof expanded[id] === 'undefined' ? false : !expanded[id]
      })
    })
  }

  handleLabelClick = (item) => {
    if (typeof this.props.selectItem === 'function') {
      this.props.selectItem(item)
    }
  }

  render() {
    const { data, selectedItem } = this.props
    const { expanded } = this.state
    const itemProps = {
      expanded,
      selectedItem,
      onArrowClick: this.handleArrowClick,
      onLabelClick: this.handleLabelClick,
    }
    return (
      <div className={'Layers'}>
        <h2 className={'Layers__title'}>Layers</h2>
        <div className={'Layers__body'}>
          {data.map(({ id, type, children }) =>
            <Item
              id={id}
              key={id}
              type={type}
              children={children}
              {...itemProps}
            />
          )}
        </div>
      </div>
    )
  }

}
