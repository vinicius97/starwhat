import React from 'react'
import PropType from 'prop-types'

//Assets
import './assets/styles/SpaceChipCard.scss'

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
    <div className={'space-ship-card'}>
      <div className={'space-ship-card__body'}>
        <span>Nome: {name}</span>
        <span>Modelo: {model}</span>
        <span>Fabricante: {manufacturer}</span>
        <span>Megalights: {mglt ? mglt : 'Não há informações disponíveis'}</span>
        <span>
          {(isNaN(numOfStopsNeeded))
            ? (
              'Não há dados o suficiente para calcular o número de paradas necessárias'
            ) : (
              `Número de paradas necessárias para percorrer a distância de ${distance} megalights: ${numOfStopsNeeded}`
            )}
        </span>
      </div>
    </div>
  )
}

SpaceShipCard.propTypes = propTypes
SpaceShipCard.defaultProps = defaultProps

export default SpaceShipCard