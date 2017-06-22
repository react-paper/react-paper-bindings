import React from 'react'
import PropTypes from 'prop-types'
import { Circle, Ellipse, Group } from 'react-paper-bindings'

const ReactLogo = ({ rotation, x, y }) => {
  return (
    <Group name={'ReactLogo'} rotation={rotation}>
      <Ellipse
        center={[x, y]}
        size={[70, 25]}
        strokeWidth={2}
        strokeColor={'#61DAFB'}
      />
      <Ellipse
        center={[x, y]}
        rotation={120}
        size={[70, 25]}
        strokeWidth={2.5}
        strokeColor={'#61DAFB'}
      />
      <Ellipse
        center={[x, y]}
        rotation={240}
        size={[70, 25]}
        strokeWidth={2.5}
        strokeColor={'#61DAFB'}
      />
      <Circle
        center={[x, y]}
        fillColor={'#61DAFB'}
        radius={7}
      />
    </Group>
  )
}

ReactLogo.propTypes = {
  rotation: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default ReactLogo
