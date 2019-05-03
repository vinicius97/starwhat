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
    searchTerm: null,
    pages: {
      actual: null,
      next: null,
      previous: null
    }
  }

  static propTypes = {
    distance: PropType.number,
    searchTerm: PropType.string
  }

  static defaultProps = {
    distance: null,
    searchTerm: null
  }

  handleChange = (type, value) => (
    this.setState({
      [type]: value
    })
  )

  handleChangeSearchTerm = (searchTerm) => {
    this.handleChange('searchTerm', searchTerm)
  }

  handlePaginationState = (response, actualPage) => {
    this.setState({
      numOfStartShips: response.count,
      pages: {
        actual: actualPage,
        next: response.next,
        previous: response.previous
      }
    })
  }

  handleRequestData = async (url) => {
    let { searchTerm } = this.state

    if(searchTerm) {
      let indexOfSearchParam = url.indexOf('search')
      if(indexOfSearchParam > -1) {
        url = url.slice((indexOfSearchParam - 1), url.length)
      }

      if(url.indexOf('?') > -1) {
        url += '&search=' + searchTerm
      } else {
        url += '?search=' + searchTerm
      }
    }

    return await http(url)
  }

  handleProcessStarShipPropTypes = (starship) => {
    let { manufacturer, model, name, MGLT } = starship

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

  handleLoadStarShips = async (url = 'https://swapi.co/api/starships') => {
    try {
      const response = await this.handleRequestData(url)
      let starShipsProcessedProperties = []

      response.data.results.map(starship => {
        starShipsProcessedProperties.push(this.handleProcessStarShipPropTypes(starship))
      })

      this.handleChange('starShips', starShipsProcessedProperties)
      this.handlePaginationState(response.data, url)

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

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = {}

    if(nextProps.searchTerm !== prevState.searchTerm) {
      state = {
        searchTerm: nextProps.searchTerm
      }
    }

    return state
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.searchTerm !== this.props.searchTerm) {
      this.handleLoadStarShips(prevState.pages.actual)
    }
  }

  componentDidMount () {
    this.handleLoadStarShips()
    this.handleChangeSearchTerm(this.props.searchTerm)
  }

  render() {

    const { distance } = this.props
    const { numOfStartShips, starShips, searchTerm } = this.state

    let showPagination = (numOfStartShips > 10)

    return (
      <div>
        Termo de busca: {searchTerm}

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

        {showPagination && (
          <div>
            <button onClick={this.handleLoadPreviousPage}>
              Página Anterior
            </button>
            <button onClick={this.handleLoadNextPage}>
              Proxima página
            </button>
          </div>
        )}
      </div>
    )

  }
}

export default SpaceShipList