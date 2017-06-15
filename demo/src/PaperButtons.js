import React from 'react'
import PropTypes from 'prop-types'
import './PaperButtons.css'

const PaperButtons = (props) => {
  return (
    <div className={'PaperButtons'}>
      {props.children}
    </div>
  )
}

PaperButtons.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PaperButtons
