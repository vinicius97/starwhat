import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Commons
import { http } from '../../commons/http'

//Components
import { SpaceShipCard } from './SpaceShipCard'
import { PaginationNavigation } from '../Pagination'

//Assets
import StartWarsLogo from '../../views/App/assets/images/star_wars_logo.svg'
import './assets/styles/SpaceShipList.scss'
import { BasicInput } from '../Form/Input'

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
    let { manufacturer, model, name, MGLT, consumables } = starship

    if(MGLT === 'unknown') {
      MGLT = null
    } else {
      MGLT = parseInt(MGLT)
    }

    return {
      manufacturer,
      model,
      name,
      mglt: MGLT,
      consumables
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

  handleChangeSearchTerm = async (searchTerm) => {
    await this.handleChange('searchTerm', searchTerm)
    this.handleLoadStarShips()
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

  componentDidMount() {
    this.handleLoadStarShips()
  }

  render() {

    const { distance } = this.props
    const { numOfStartShips, starShips, searchTerm } = this.state

    let showPagination = (numOfStartShips > 10)

    const classNameMap = {
      base: 'space-ship-list',
      body: 'space-ship-list__body',
      search: 'space-ship-list__search'
    }

    return (
      <div className={classNameMap.base}>
        Pesquisar
        <BasicInput
          className={classNameMap.search}
          onChange={(e) => this.handleChangeSearchTerm(e.target.value)} />

        {searchTerm && (`Termo de busca: ${searchTerm}`)}

        <div className={classNameMap.body}>
          {starShips &&
          starShips.map((starShip, key) => {
            const { manufacturer, model, consumables, name, mglt } = starShip

            return (
              <SpaceShipCard
                manufacturer={manufacturer}
                model={model}
                consumables={consumables}
                name={name}
                mglt={mglt}
                distance={distance}
                key={key}
              />
            )
          })
          }
        </div>

        {showPagination && (
          <PaginationNavigation
            onPreviousPage={this.handleLoadPreviousPage}
            onNextPage={this.handleLoadNextPage} />
        )}
      </div>
    )

  }
}

export { SpaceShipList }