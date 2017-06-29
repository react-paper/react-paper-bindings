import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default class Button extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tool: PropTypes.string,
  }

  handleClick = () => {
    this.props.onClick(this.props.tool)
  }

  render() {
    const { active, children, tool, ...rest } = this.props
    const className = `Button ${active?'Button-active':''}`
    return (
      <button {...rest} className={className} onClick={this.handleClick}>
        {children}
      </button>
    )
  }

}
