import React, { PureComponent } from 'react'
import PropType from 'prop-types'

//Assets
import './assets/styles/SpaceChipCard.scss'

//Components
import textLimiter from '../TextLimiter'

export function calculateNumOfStopsByMGLT(distance, capacity) {
  let numOfStops = distance/capacity

  return Math.ceil(numOfStops)
}

class SpaceShipCard extends PureComponent {

  static propTypes = {
    distance: PropType.number,
    mglt: PropType.number,
    manufacturer: PropType.string,
    model: PropType.string,
    name: PropType.string,
  }

  static defaultProps = {
    distance: null,
    mglt: null,
    manufacturer: null,
    model: null,
    name: null
  }

  state = {
    expanded: false
  }

  handleShowMode = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const {
      distance,
      name,
      model,
      manufacturer,
      mglt
    } = this.props

    const {
      expanded
    } = this.state

    const classNameMap = {
      base: 'space-ship-card',
      expanded: 'space-ship-card space-ship-card--expanded',
      body: 'space-ship-card__body',
      field: 'space-ship-card__body__field',
      field_key: 'space-ship-card__body__field__key',
      field_value: 'space-ship-card__body__field__value'
    }
    let numOfStopsNeeded = calculateNumOfStopsByMGLT(distance, mglt)

    return (
      <div
        className={expanded ? classNameMap.expanded : classNameMap.base}
        onClick={this.handleShowMode}>

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