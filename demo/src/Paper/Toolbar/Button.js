import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default class Button extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    setTool: PropTypes.func,
    tool: PropTypes.string,
  }

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e)
    } else if (this.props.setTool) {
      this.props.setTool(this.props.tool)
    }
  }

  render() {
    const { active, children, onClick, setTool, tool, ...rest } = this.props
    const props = {
      className: `Button${active ? ' Button-active' : ''}`,
      onClick: this.handleClick,
    }
    return (
      <button {...rest} {...props}>
        {children}
      </button>
    )
  }

}
