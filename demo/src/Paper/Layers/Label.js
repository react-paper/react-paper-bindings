import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Label.css'

export default class Label extends Component {

  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
  }

  handleLabelClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props)
    }
  }

  render() {
    const { children, icon, selected } = this.props
    const className = `tree-view_label${selected ? ' tree-view_label-selected': ''}`
    return (
      <div className={className} onClick={this.handleLabelClick}>
        {icon && <i className={'material-icons'}>{icon}</i>}
        <span>{children}</span>
      </div>
    )
  }

}
