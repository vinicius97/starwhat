import React, { PureComponent } from 'react'

//Components
import { SpaceShipCard } from './components/SpaceShip'
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
        <SpaceShipCard
          manufacturer={'Millennium Falcon'}
          model={'YT-1300 light freighter'}
          mglt={75}
          name={'Millennium Falcon'}
          distance={distance}
        />
      </div>
    )
  }

}

export default App
