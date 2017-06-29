import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Item from './PaperTreeItem'

import './PaperTree.css'

export default class PaperTree extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: {},
    }
  }

  toggleExpanded = (id) => {
    const { expanded } = this.state
    this.setState({
      expanded: Object.assign({}, expanded, {
        [id]: typeof expanded[id] === 'undefined' ? false : !expanded[id]
      })
    })
  }

  render() {
    const { items } = this.props
    const { expanded } = this.state
    return (
      <div className={'PaperTree'}>
        <h2 className={'PaperTree__title'}>Layers</h2>
        <div className={'PaperTree__body'}>
          {items.map(([type, options], index) =>
            <Item
              id={`${options.name||type}${index}`}
              key={`${options.name||type}${index}`}
              type={type}
              options={options}
              expanded={expanded}
              onClick={this.toggleExpanded}
            />
          )}
        </div>
      </div>
    )
  }

}
