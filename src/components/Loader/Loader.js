import React from 'react'

//Assets
import LoaderIcon from './assets/images/loader.svg'
import './assets/styles/Loader.scss'

export const Loader = (props) => (
  <div className={'loader'}>
    <img src={LoaderIcon} width={'100px'} alt='Carregando...'/>
  </div>
)