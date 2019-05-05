import React from 'react'

//Assets
import './assets/styles/PaginationNavigation.scss'

export const PaginationNavigation = (props) => {
  const  { onPreviousPage, onNextPage } = props
  const classNameMap = {
    base: 'pagination-navigation',
    button: 'pagination-navigation__button'
  }

  return (
    <div className={classNameMap.base}>
      <button className={classNameMap.button} onClick={onPreviousPage}>
        Página Anterior
      </button>
      <button className={classNameMap.button} onClick={onNextPage}>
        Proxima página
      </button>
    </div>
  )
}