import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Commons
import { http } from '../../commons/http'

//Components
import { SpaceShipCard } from './SpaceShipCard'

class SpaceShipList extends PureComponent {

  state = {
    starShips: null,
    numOfStartShips: null,
    pages: {
      next: null,
      previous: null
    }
  }

  static propTypes = {
    distance: PropType.number
  }

  static defaultProps = {
    distance: null
  }

  handleChange = (type, value) => (
    this.setState({
      [type]: value
    })
  )

  handleRequestData = async (url) => {
    return await http(url)
  }

  handleListState = (response) => {
    this.setState({
      numOfStartShips: response.count,
      pages: {
        next: response.next,
        previous: response.previous
      }
    })
  }

  handleProcessStarShipPropTypes = (starship) => {
    let { manufacturer, model, name, MGLT } = starship

    console.log(MGLT)

    if(MGLT === 'unknown') {
      MGLT = null
    } else {
      MGLT = parseInt(MGLT)
    }

    return {
      manufacturer,
      model,
      name,
      mglt: MGLT
    }
  }

  handleLoadStarShips = async (url = 'https://swapi.co/api/starships/') => {
    try {
      const response = await this.handleRequestData(url)
      let starShipsProcessedProperties = []

      response.results.map(starship => {
        starShipsProcessedProperties.push(this.handleProcessStarShipPropTypes(starship))
      })

      this.handleChange('starShips', starShipsProcessedProperties)
      this.handleListState(response)

    } catch (e) {
      throw e
    }
  }

  handleLoadNextPage = () => {
    let { pages } = this.state
    let nextPage = pages.next

    if(nextPage !== null) {
      this.handleLoadStarShips(nextPage)
    }
  }

  handleLoadPreviousPage = () => {
    let { pages } = this.state
    let previousPage = pages.previous

    if(previousPage !== null) {
      this.handleLoadStarShips(previousPage)
    }
  }

  componentDidMount () {
    this.handleLoadStarShips()
  }

  render() {

    const { distance } = this.props
    const { starShips } = this.state

    return (
      <div>
        {starShips &&
          starShips.map((starShip, key) => {
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
          })
        }

        <button onClick={this.handleLoadPreviousPage}>
          Página Anterior
        </button>
        <button onClick={this.handleLoadNextPage}>
          Proxima página
        </button>
      </div>
    )

  }
}

export default SpaceShipList