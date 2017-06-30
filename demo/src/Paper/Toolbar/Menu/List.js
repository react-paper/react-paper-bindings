import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

import './List.css'

export default class List extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    closePortal: PropTypes.func,
  }

  render() {
    const { closePortal } = this.props
    const children = Children.toArray(this.props.children).filter(c => c)
    return (
      <ul className={'PortalMenu__List'} ref={ref => this.list = ref}>
        {Children.map(children, (child, index) => cloneElement(child, {
          tabIndex: index + 1,
          closeMenu: closePortal,
        }))}
      </ul>
    )
  }

}
