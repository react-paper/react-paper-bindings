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
    activeLayer: PropTypes.number,
    selectedItem: PropTypes.number,
    onArrowClick: PropTypes.func,
    onLabelClick: PropTypes.func,
  }

  handleArrowClick = () => {
    if (this.props.onArrowClick) {
      this.props.onArrowClick(this.props)
    }
  }

  render() {
    const {
      id, type, children, expanded,
      activeLayer, selectedItem, onLabelClick,
    } = this.props
    const isGroup = type === 'Group' || type === 'Layer'
    const hasChildren = children && children.length
    const labelProps = {
      id, type,
      icon: getIcon(type),
      onClick: onLabelClick,
      selected: id === selectedItem || (id === activeLayer && !selectedItem),
    }
    const treeProps = {
      collapsed: expanded[id] === false,
      onClick: this.handleArrowClick,
      nodeLabel: <Label {...labelProps}>{type}</Label>,
    }
    return (
      <Tree {...treeProps}>
        {hasChildren && children.map(({ id, type }) =>
          <Label
            key={id}
            id={id}
            type={type}
            selected={id === selectedItem}
            icon={getIcon(type)}
            onClick={onLabelClick}>
            {type}
          </Label>
        )}
        {!hasChildren && isGroup &&
          <Label icon={'insert_drive_file'}>Empty</Label>}
      </Tree>
    )
  }

}
