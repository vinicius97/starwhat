import React from 'react'
import PropType from 'prop-types'

const propTypes = {
  name: PropType.string,
  model: PropType.string,
  manufacturer: PropType.string,
  mglt: PropType.number
}

const defaultProps = {
  name: null,
  model: null,
  manufacturer: null,
  mglt: null
}

function calculateNumOfStopsByMGLT(distance, capacity) {
  let numOfStops = distance/capacity

  return Math.ceil(numOfStops)
}

const SpaceShipCard = (props) => (
  <div>
    Card da nave
  </div>
)

SpaceShipCard.propTypes = propTypes
SpaceShipCard.defaultProps = defaultProps

export default SpaceShipCard