import React, { PureComponent } from 'react'

//Components
import { SpaceShipList } from './components/SpaceShip'
import { BasicInput } from './components/Form'

class App extends PureComponent {

  state = {
    distance: null,
    searchTerm: null
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    let { distance, searchTerm } = this.state

    return (
      <div>
        Pesquisar
        <BasicInput onChange={(e) => this.handleChange('searchTerm', e.target.value)} />

        Distância a ser percorrida(em Megalights)
        <BasicInput onChange={(e) => this.handleChange('distance', e.target.value)} />
        <SpaceShipList searchTerm={searchTerm} distance={distance} />
      </div>
    )
  }

}

export default App
