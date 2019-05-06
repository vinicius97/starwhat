import React from 'react'
import { SpaceShipCard, calculateNumOfStopsByMGLT } from '../SpaceShipCard'

describe('Testes para <SpaceShipCard />', () => {

  const wrapper = shallow(<SpaceShipCard />)

  it('Valida snapshop', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Renderiza um card', () => {

    expect(wrapper.exists()).toBe(true)

  })
})