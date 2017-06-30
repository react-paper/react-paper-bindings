import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Item.css'

export default class Item extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    closeMenu: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props)
    }
    this.props.closeMenu()
  }

  render() {
    const { children, tabIndex } = this.props
    const props = {
      className: 'PortalMenu__Item',
      onClick: this.handleClick,
      tabIndex,
    }
    return (
      <li {...props}>
        {children}
      </li>
    )
  }

}
