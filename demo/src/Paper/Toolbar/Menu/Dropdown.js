import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'
import Tether from 'tether'

import './Dropdown.css'

const POS = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  m: 'middle',
  c: 'center',
}

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef()
  }

  static propTypes = {
    align: function(props, propName, componentName) {
      if (!/[btm][lrc] [btm][lrc]/.test(props[propName])) {
        return new Error(
          `Invalid prop ${propName} (${props[propName]}) ` +
          `supplied to ${componentName}. Validation failed.`
        )
      }
    },
    children: PropTypes.any.isRequired,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
  }

  static defaultProps = {
    align: 'tl bl',
    closeOnEsc: true,
    closeOnOutsideClick: true,
    offset: '0 0',
  }

  onOpen = (portalNode) => {
    const { align, offset } = this.props
    const [ay,ax,ty,tx] = align.split('').map(a => a && POS[a]).filter(a => a)
    const [oy,ox] = offset.split(' ').map(o => parseInt(o, 10))

    portalNode.classList.add('Dropdown')

    this._tether = new Tether({
      element: portalNode,
      target: this.ref,
      attachment: `${ay} ${ax}`,
      targetAttachment: `${ty} ${tx}`,
      offset: `${oy} ${ox}`,
      constraints: [{
        to: 'window',
        pin: true,
      }],
    })

    portalNode.style.opacity = 1
  }

  beforeClose = (portalNode, remove) => {
    if (this._tether) {
      this._tether.destroy()
    }
    this._timeout = setTimeout(remove)
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }
  }
  render() {
    const { children, closeOnEsc, closeOnOutsideClick, target } = this.props
    return (
      <Portal
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        openByClickOn={target}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        ref={this.ref}
      >
        {children}
      </Portal>
    )
  }

}
