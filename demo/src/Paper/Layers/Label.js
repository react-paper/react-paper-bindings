import React from 'react'
import PropTypes from 'prop-types'

import './Label.css'

const Label = (props) => {
  const { children, icon, onClick } = props
  return (
    <div className={'tree-view_label'} onClick={onClick}>
      {icon && <i className={'material-icons'}>{icon}</i>}
      <span>{children}</span>
    </div>
  )
}

Label.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
}

export default Label
