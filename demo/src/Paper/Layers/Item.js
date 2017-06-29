import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-treeview'

import Label from './Label'

import './Item.css'

function getIcon(type) {
  switch (type) {
    case 'Layer':     return 'layers'
    case 'Group':     return 'folder'
    case 'Path':      return 'timeline'
    case 'Circle':    return 'lens'
    case 'Rectangle': return 'crop_square'
    case 'Raster':    return 'photo'
    default:          return 'insert_drive_file'
  }
}

export default class Item extends Component {

  static propTypes = {
    id: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    expanded: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id)
    }
  }

  render() {
    const { id, type, children, expanded } = this.props
    const isGroup = type === 'Group' || type === 'Layer'
    const hasChildren = children && children.length
    const labelProps = {
      icon: getIcon(type),
      onClick: this.handleClick,
    }
    const treeProps = {
      collapsed: expanded[id] === false,
      onClick: this.handleClick,
      nodeLabel: <Label {...labelProps}>{type}</Label>,
    }
    return (
      <Tree {...treeProps}>
        {hasChildren && children.map(({ id, type, children }) =>
          <Label key={id} icon={getIcon(type)}>{type}</Label>
        )}
        {!hasChildren && isGroup &&
          <Label icon={'insert_drive_file'}>Empty</Label>}
      </Tree>
    )
  }

}
