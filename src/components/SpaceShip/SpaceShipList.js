import React from 'react'
import StarShipMockResponse from './data/starshipMockResponse.json'

//Components
import { SpaceShipCard } from './SpaceShipCard'

function retrieveStarShips() {
  try {
    const starShips = StarShipMockResponse.results

    let starShipsProcessedProperties = []

    starShips.map(starship => {
      let { manufacturer, model, name, MGLT } = starship
      return starShipsProcessedProperties.push({ manufacturer, model, name, mglt: parseInt(MGLT) })
    })

    return starShipsProcessedProperties
  } catch (e) {
    throw e
  }
}

const SpaceShipList = (props) => {
  const { distance } = props
  const starShips = retrieveStarShips()

  return starShips && starShips.map((starShip, key) => {
    const { manufacturer, model, name, mglt } = starShip

    return (
        <SpaceShipCard
          manufacturer={manufacturer}
          model={model}
          name={name}
          mglt={mglt}
          distance={distance}
          key={key}
        />
      )
    }
  )
}

export default SpaceShipList