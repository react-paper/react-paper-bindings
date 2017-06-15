import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './PaperButton.css'

export default class PaperButton extends Component {

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
    const { active, children } = this.props
    const className = classnames('PaperButton', {
      'PaperButton-active': active,
    })
    return (
      <button className={className} onClick={this.handleClick}>
        {children}
      </button>
    )
  }

}
