import React from 'react'
import { SpaceShipList, SpaceShipCard } from '../index'

describe('Testes para <SpaceShipList />', () => {

  const wrapper = mount(<SpaceShipList />)

  it('Valida snapshop', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Renderiza o <SpaceShipList />', () => {
    expect(wrapper.exists()).toBe(true)
  })
})