import React, { PureComponent } from 'react'
import { http } from '../../commons/http'

//Components
import { SpaceShipCard } from './SpaceShipCard'

class SpaceShipList extends PureComponent {

  state = {
    starShips: null
  }

  handleRequestStarShips = async () => {
    return await http('https://swapi.co/api/starships/')
  }

  handleLoadStarShips = async () => {
    try {
      const starShips = await this.handleRequestStarShips()

      let starShipsProcessedProperties = []

      starShips.results.map(starship => {
        let { manufacturer, model, name, MGLT } = starship
        let properties = {
          manufacturer,
          model,
          name,
          mglt: parseInt(MGLT)
        }

        return starShipsProcessedProperties.push(properties)
      })

      this.setState({
        starShips: starShipsProcessedProperties
      })

    } catch (e) {
      throw e
    }
  }

  componentDidMount () {
    this.handleLoadStarShips()
  }

  render() {
    {
      const { distance } = this.props
      const { starShips }= this.state

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
  }
}

export default SpaceShipList