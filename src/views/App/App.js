import React, { PureComponent } from 'react'

//Assets
import StartWarsLogo from './assets/images/star_wars_logo.svg'
import './assets/styles/App.scss'

//Components
import { SpaceShipList } from '../../components/SpaceShip'
import { BasicInput } from '../../components/Form'

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
    const { distance, searchTerm } = this.state

    const classNamesMap = {
      base: 'app',
      container: 'app__container',
      logo: 'app__container__logo',
      callToAction: 'app__container__call-to-action',
      h2: 'app__h2'
    }

    return (
      <div className={classNamesMap.container}>
        <div className={classNamesMap.logo}>
          <img width={'200px'} src={StartWarsLogo} alt='Logotipo do Star Wars'/>
        </div>

        {/*Pesquisar
        <BasicInput onChange={(e) => this.handleChange('searchTerm', e.target.value)} />*/}

        <div className={classNamesMap.callToAction}>
          <h2 className={classNamesMap.h2}>
            Distância a ser percorrida(em Megalights)
          </h2>

          <BasicInput
            type='number'
            placeholder='Ex: 10'
            onChange={(e) => this.handleChange('distance', e.target.value)} />
        </div>

        <SpaceShipList searchTerm={searchTerm} distance={distance} />
      </div>
    )
  }

}

export default App
