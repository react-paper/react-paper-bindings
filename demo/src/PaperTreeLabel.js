import React from 'react'
import PropTypes from 'prop-types'

import './PaperTreeLabel.css'

const PaperTreeLabel = (props) => {
  const { children, icon, onClick } = props
  return (
    <span className={'PaperTreeLabel tree-view_label'} onClick={onClick}>
      {icon && <i className={'material-icons'}>{icon}</i>}
      <span>{children}</span>
    </span>
  )
}

PaperTreeLabel.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
}

export default PaperTreeLabel
