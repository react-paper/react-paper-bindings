import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'

import Item from './Item'

import './Layers.css'

export default class Layers extends Component {

  static propTypes = {
    activeLayer: PropTypes.number,
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
    const { activeLayer, data, selectedItem } = this.props
    const { expanded } = this.state
    const itemProps = {
      activeLayer,
      expanded,
      selectedItem,
      onArrowClick: this.handleArrowClick,
      onLabelClick: this.handleLabelClick,
    }
    return (
      <div className={'Layers'}>
        <h2 className={'Layers__title'}>
          <i className={'material-icons'}>layers</i>
          <span>Layers</span>
        </h2>
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
