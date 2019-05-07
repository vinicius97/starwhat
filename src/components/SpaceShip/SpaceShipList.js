import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Commons
import { http } from '../../commons/http'

//Components
import { SpaceShipCard } from './SpaceShipCard'
import { PaginationNavigation } from '../Pagination'
import { Loader } from '../Loader'

//Assets
import './assets/styles/SpaceShipList.scss'
import { BasicInput } from '../Form/Input'

class SpaceShipList extends PureComponent {

  state = {
    starShips: null,
    numOfStartShips: null,
    searchTerm: null,
    loading: false,
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

      if(indexOfSearchParam > 0) {
        url = url.slice((indexOfSearchParam - 1), url.length)
      } else {
        if(url.indexOf('?') > -1) {
          url += '&search=' + searchTerm
        } else {
          url += '?search=' + searchTerm
        }
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

  handleChangeStarShips = async (starShips, response, url, loadAll = false, recursive = false) => {
    if(loadAll === true && recursive === false) {
      this.handleChange('starShips', [])
    }

    if(loadAll) {
      let concatStarShips = [...starShips, ...this.state.starShips]
      let { data } = response
      this.handleChange('starShips', concatStarShips)

      if(response.data.next !== null && concatStarShips.length < data.count) {
        this.handleLoadStarShips(data.next, true, true)
      } else {
        this.handlePaginationState(data, url)
      }

    } else {
      this.handleChange('starShips', starShips)
      this.handlePaginationState(response.data, url)
    }
  }

  handleLoadStarShips = async (url = 'https://swapi.co/api/starships', loadAll = false, recursive = false) => {
    try {
      this.handleChange('loading', true)

      const response = await this.handleRequestData(url)
      let starShipsProcessedProperties = []

      let result = response.data.results

      result && result.map(starship => (
        starShipsProcessedProperties.push(this.handleProcessStarShipPropTypes(starship))
      ))

      this.handleChangeStarShips(starShipsProcessedProperties, response, url, loadAll, recursive)
      this.handleChange('loading', false)

    } catch (e) {

      this.handleChange('loading', false)
      throw e

    }
  }

  handleChangeSearchTerm = async (searchTerm) => {
    await this.handleChange('searchTerm', searchTerm)

    let waitForStopTyping = setTimeout(() => {
      if(this.state.searchTerm === searchTerm) {
        this.handleLoadStarShips()
      }
    }, 500)

    return waitForStopTyping
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
    this.handleLoadStarShips('https://swapi.co/api/starships', true)
  }

  render() {

    const { distance } = this.props
    const { starShips, searchTerm, loading } = this.state

    let showPagination = (searchTerm !== null)

    const classNameMap = {
      base: 'space-ship-list',
      body: 'space-ship-list__body',
      search: 'space-ship-list__search'
    }

    return (
      <div className={classNameMap.base}>
        <BasicInput
          className={classNameMap.search}
          placeholder='Buscar por uma nave específica'
          onChange={(e) => this.handleChangeSearchTerm(e.target.value)} />

        {loading ? (
          <Loader />
        ) : (
          <div className={classNameMap.body}>
            {
              starShips && starShips.length > 0 ? (
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
              ) : (
                'Não há resultados'
              )
          }
          </div>
        )}

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