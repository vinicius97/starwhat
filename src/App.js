import React, { PureComponent } from 'react'

//Components
import { SpaceShipList } from './components/SpaceShip'
import { BasicInput } from './components/Form'

class App extends PureComponent {

  state = {
    distance: null
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  render() {

    let { distance } = this.state

    return (
      <div>
        <BasicInput onChange={(e) => this.handleChange('distance', e.target.value)} />
        <SpaceShipList distance={distance} />
      </div>
    )
  }

}

export default App
