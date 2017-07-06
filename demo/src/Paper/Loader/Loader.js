import React from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'

import './Loader.css'

const Loader = ({ color, size }) => {
  const style = assign({},
    color && { backgroundColor: color },
    size && { width: size, height: size },
  )
  return (
    <div className={'Loader'}>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
    </div>
  )
}

Loader.propTypes =  {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Loader
