import React from 'react'
import { SpaceShipCard, calculateNumOfStopsByMGLT } from '../SpaceShipCard'

describe('Testes para <SpaceShipCard />', () => {

  const wrapper = shallow(<SpaceShipCard />)

  it('Valida snapshop', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Valida função calculateNumOfStopsByMGLT', () => {
    let distance = 1000
    let capacity = 100
    let numOfStops = calculateNumOfStopsByMGLT(distance, capacity)

    expect(numOfStops).toBe(10);
  })

  it('Renderiza um card', () => {

    expect(wrapper.exists()).toBe(true)

  })

  it('Exibe o número de paradas necessárias com parametros válidos', () => {

    let distance = 1000
    let capacity = 100
    let numOfStops = calculateNumOfStopsByMGLT(distance, capacity)

    wrapper.setProps({
      distance: distance,
      mglt: capacity
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.contains('Não há dados o suficiente para calcular o número de paradas necessárias')).toBe(false)
    expect(
      wrapper.contains(
        `Número de paradas necessárias para percorrer a distância de ${distance} megalights: ${numOfStops}`
      )
    ).toBe(true)
  })
})