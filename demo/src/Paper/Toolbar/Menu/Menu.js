import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dropdown from './Dropdown'
import List from './List'

import './Menu.css'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.any.isRequired,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
  }

  render() {
    const { children, ...rest } = this.props
    return (
      <Dropdown className={'PortalMenu'} {...rest}>
        <List>
          {children}
        </List>
      </Dropdown>
    )
  }

}
