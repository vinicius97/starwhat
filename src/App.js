import React from 'react'

//Components
import { SpaceShipCard } from './components/SpaceShip'

function App() {
  return (
    <SpaceShipCard
      manufacturer={'Millennium Falcon'}
      model={'YT-1300 light freighter'}
      mglt={75}
      name={'Millennium Falcon'}
    />
  )
}

export default App
