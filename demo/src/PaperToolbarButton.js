import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './PaperToolbarButton.css'

export default class PaperToolbarButton extends Component {

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
    const className = `PaperToolbarButton ${active?'PaperToolbarButton-active':''}`
    return (
      <button {...rest} className={className} onClick={this.handleClick}>
        {children}
      </button>
    )
  }

}
