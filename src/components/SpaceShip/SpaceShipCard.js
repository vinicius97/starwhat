import React from 'react'
import PropType from 'prop-types'

const propTypes = {
  name: PropType.string,
  model: PropType.string,
  manufacturer: PropType.string,
  MGLT: PropType.number
}

const defaultProps = {
  name: null,
  model: null,
  manufacturer: null,
  MGLT: null
}
const SpaceShipCard = (props) => (
  <div>
    Card da nave
  </div>
)

SpaceShipCard.propTypes = propTypes
SpaceShipCard.defaultProps = defaultProps

export default SpaceShipCard