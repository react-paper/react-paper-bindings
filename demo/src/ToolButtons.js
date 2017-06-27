import React from 'react'
import PropTypes from 'prop-types'

import './ToolButtons.css'

const ToolButtons = (props) => {
  return (
    <div className={'ToolButtons'}>
      {props.children}
    </div>
  )
}

ToolButtons.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ToolButtons
