import React from 'react'

export const PaginationNavigation = (props) => {
  const  { onPreviousPage, onNextPage } = props

  return (
    <div>
      <button onClick={onPreviousPage}>
        Página Anterior
      </button>
      <button onClick={onNextPage}>
        Proxima página
      </button>
    </div>
  )
}