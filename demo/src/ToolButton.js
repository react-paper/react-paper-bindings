import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ToolButton.css'

export default class ToolButton extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    tool: PropTypes.string.isRequired,
  }

  handleClick = () => {
    this.props.onClick(this.props.tool)
  }

  render() {
    const { active, children, tool, ...rest } = this.props
    const className = `ToolButton ${active?'ToolButton-active':''}`
    return (
      <button {...rest} className={className} onClick={this.handleClick}>
        {children}
      </button>
    )
  }

}
