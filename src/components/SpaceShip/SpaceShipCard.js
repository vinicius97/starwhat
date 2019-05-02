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

const SpaceShipCard = (props) => {
  const {
    name,
    model,
    manufacturer,
    mglt
  } = props

  let distance = 1000
  let capacity = mglt

  let numOfStopsNeeded = calculateNumOfStopsByMGLT(distance, capacity)

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