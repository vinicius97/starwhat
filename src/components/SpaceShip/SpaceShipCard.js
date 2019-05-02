import React from 'react'
import PropType from 'prop-types'

const propTypes = {
  distance: PropType.number,
  mglt: PropType.number,
  manufacturer: PropType.string,
  model: PropType.string,
  name: PropType.string,
}

const defaultProps = {
  distance: null,
  mglt: null,
  manufacturer: null,
  model: null,
  name: null
}

function calculateNumOfStopsByMGLT(distance, capacity) {
  let numOfStops = distance/capacity

  return Math.ceil(numOfStops)
}

export const SpaceShipCard = (props) => {
  const {
    distance,
    name,
    model,
    manufacturer,
    mglt
  } = props

  let numOfStopsNeeded = calculateNumOfStopsByMGLT(distance, mglt)

  return (
    <div>
      Nome: {name}
      Modelo: {model}
      Fabricante: {manufacturer}
      Megalights: {mglt}
      Número de paradas necessárias para percorrer a distância de {distance} megalights: {numOfStopsNeeded}
    </div>
  )
}

SpaceShipCard.propTypes = propTypes
SpaceShipCard.defaultProps = defaultProps

export default SpaceShipCard