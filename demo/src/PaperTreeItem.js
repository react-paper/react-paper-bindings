import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-treeview'

import Label from './PaperTreeLabel'

import './PaperTreeItem.css'

export default class PaperTreeItem extends Component {

  static propTypes = {
    id: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id)
    }
  }

  getIcon() {
    const { type, options } = this.props
    if (type === 'Path' && options.name === 'Circle') return 'lens'
    if (type === 'Path' && options.name === 'Rectangle') return 'crop_square'
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

  render() {
    const { id, type, options, expanded, onClick } = this.props
    const { children, ...props } = options
    const isGroup = type === 'Group' || type === 'Layer'
    const hasChildren = children  && children.length
    const labelProps = {
      icon: this.getIcon(),
      onClick: this.handleClick,
    }
    const treeProps = {
      collapsed: expanded[id] === false,
      onClick: this.handleClick,
      nodeLabel: <Label {...labelProps}>{props.name}</Label>,
      itemClassName: 'PaperTreeItem ' + (!isGroup && !hasChildren ? 'PaperTreeItem--final' : ''),
    }
    return (
      <Tree {...treeProps}>
        {hasChildren && children.map(([type, options], index) =>
          <PaperTreeItem
            id={`${options.name||type}${index}`}
            key={`${options.name||type}${index}`}
            type={type}
            options={options}
            expanded={expanded}
            onClick={onClick}
          />
        )}
        {isGroup && !hasChildren ?
          <div className={'PaperTreeItem PaperTreeItem--final'}>
            <Label icon={'insert_drive_file'} final>Empty</Label>
          </div> : false}
      </Tree>
    )
  }

}
