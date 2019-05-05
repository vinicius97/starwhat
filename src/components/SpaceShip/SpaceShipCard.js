import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Assets
import './assets/styles/SpaceChipCard.scss'

//Components
import textLimiter from '../TextLimiter'

export function calculateNumOfStopsByMGLT(distance, mgltByHour, consumable, calendarType = 'galactic') {
  if(distance === null || mgltByHour === null || consumable === null) {
    return null
  }

  const hour = 1
  const day = 24 * hour

  const galacticCalendar = {
    hour,
    day,
    week: 5 * day,
    month: 35 * day,
    year: 368 * day
  }

  const earthCalendar = {
    hour,
    day,
    week: 7 * day,
    month: 31 * day,
    year: 365 * day
  }

  // Tempo baseado no calendário galático https://starwars.fandom.com/wiki/Galactic_Standard_Calendar

  let consumableSplited = consumable.split(' ')
  let consumableValue = parseFloat(consumableSplited[0])
  let consumableUnit = consumableSplited[1]

  let calendar = null
  if(calendarType === 'galactic') {
    calendar = galacticCalendar
  } else {
    calendar = earthCalendar
  }

  let convertionFactor = {
    hour: calendar.hour,
    hours: calendar.hour,
    day: calendar.day,
    days: calendar.day,
    week: calendar.week,
    weeks: calendar.week,
    month: calendar.month,
    months: calendar.month,
    year: calendar.year,
    years: calendar.year
  }

  let consumableUnitInHours = convertionFactor[consumableUnit]
  let consumableValueInHours = consumableValue * consumableUnitInHours

  let tripTime = distance/mgltByHour

  let numOfStops = tripTime/consumableValueInHours

  return Math.ceil(numOfStops)
}

class SpaceShipCard extends PureComponent {

  static propTypes = {
    distance: PropType.number,
    mglt: PropType.number,
    consumables: PropType.string,
    manufacturer: PropType.string,
    model: PropType.string,
    name: PropType.string,
  }

  static defaultProps = {
    distance: null,
    consumables: null,
    mglt: null,
    manufacturer: null,
    model: null,
    name: null
  }

  state = {
    useEarthCalendar: false
  }

  handleUseEarthCalendar = () => {
    this.setState({
      useEarthCalendar: !this.state.useEarthCalendar
    })
  }

  render() {
    const {
      distance,
      name,
      consumables,
      model,
      manufacturer,
      mglt
    } = this.props

    const {
      useEarthCalendar
    } = this.state

    const classNameMap = {
      base: 'space-ship-card',
      body: 'space-ship-card__body',
      field: 'space-ship-card__body__field',
      field_key: 'space-ship-card__body__field__key',
      field_value: 'space-ship-card__body__field__value'
    }

    let calendar = useEarthCalendar ? 'earth' : 'galactic'
    let numOfStopsNeeded = calculateNumOfStopsByMGLT(distance, mglt, consumables, calendar)

    return (
      <div className={classNameMap.base}>

        <div onClick={() => this.handleUseEarthCalendar()}>
          {useEarthCalendar ? '[x]' : '[ ]'} Usar calendário terráqueo
        </div>

        <div className={classNameMap.body}>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Nome
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(name, 23)}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Modelo
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(model, 22)}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Fabricante
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(manufacturer, 19)}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Megalights
            </span>
            <span className={classNameMap.field_value}>
              {mglt ? mglt : 'Não há informações disponíveis'}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Número de paradas
            </span>
            <span className={classNameMap.field_value}>
              {
                (isNaN(numOfStopsNeeded))
                  ? (
                    'Não há dados o suficiente'
                  ) : (
                    numOfStopsNeeded
                  )
              }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export { SpaceShipCard }