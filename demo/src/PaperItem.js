import React from 'react'
import PropTypes from 'prop-types'
import { Circle, Layer, Path, Raster, Rectangle } from 'react-paper-bindings' // eslint-disable-line no-unused-vars

function getProps(props) {
  const { type, name } = props
  if (type === 'Path' && name === 'ReactLogo') return props
  switch (type) {
    case 'Raster':
      return {
        onLoad: props.onImageLoad,
      }
    case 'Layer':
      return {
        visible: props.imageLoaded,
      }
    case 'Path':
      return {
        strokeColor: 'red',
        strokeScaling: false,
        strokeWidth: 2,
      }
    default:
      return {}
  }
}

const PaperItem = (props) => {
  const { id, type, children, imageLoaded } = props
  const itemProps = { ...props, ...getProps(props) }
  const Item = type
  return (
    <Item reactId={id} {...itemProps}>
      {children && children.map(([ type, options ], index) =>
        <PaperItem
          id={`${type}${index}`}
          key={`${type}${index}`}
          type={type}
          imageLoaded={imageLoaded}
          onImageLoad={props.onImageLoad}
          {...options}
        />
      )}
    </Item>
  )
}

PaperItem.propTypes = {
  id: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.array,
}

export default PaperItem
