import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Assets
import './assets/styles/SpaceChipCard.scss'

//Components
import textLimiter from '../TextLimiter'

export function calculateNumOfStopsToRessuplyByMGLT(distance, mgltByHour, consumables) {
  if(distance === null || mgltByHour === null || consumables === null) {
    return null
  }

  const hour = 1
  const day = 24 * hour
  const week =  7 * day
  const month = 31 * day
  const year = 365 * day

  let consumableSplited = consumables.split(' ')
  let consumableValue = parseFloat(consumableSplited[0])
  let consumableUnit = consumableSplited[1]

  let unitConversionFactor = {
    hour: hour,
    hours: hour,
    day: day,
    days: day,
    week: week,
    weeks: week,
    month: month,
    months: month,
    year: year,
    years: year
  }

  let consumableUnitInHours = unitConversionFactor[consumableUnit]
  let consumableValueInHours = consumableValue * consumableUnitInHours

  let tripTimeInHours = distance/mgltByHour
  let numOfStopsToResupply = tripTimeInHours/consumableValueInHours

  return Math.round(numOfStopsToResupply)
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

  render() {
    const {
      distance,
      name,
      consumables,
      model,
      manufacturer,
      mglt
    } = this.props

    const classNameMap = {
      base: 'space-ship-card',
      body: 'space-ship-card__body',
      field: 'space-ship-card__body__field',
      field_key: 'space-ship-card__body__field__key',
      field_value: 'space-ship-card__body__field__value'
    }

    let numOfStopsNeeded = calculateNumOfStopsToRessuplyByMGLT(distance, mglt, consumables)

    return (
      <div className={classNameMap.base}>
        <div className={classNameMap.body}>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Nome
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(name, 21)}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Modelo
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(model, 20)}
            </span>
          </div>
          <div className={classNameMap.field}>
            <span className={classNameMap.field_key}>
              Fabricante
            </span>
            <span className={classNameMap.field_value}>
              {textLimiter(manufacturer, 17)}
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
              Número de paradas para reabastecer
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