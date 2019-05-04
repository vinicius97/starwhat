import React from 'react'

//Assets
import './assets/style/BasicInput.scss'

const BasicInput = (props) => {
  let { type, className } = props

  if(type === 'number') {
    className += ' basic-input--number'
  }

  return (
    <input
      type="text"
      className={className}
      {...props} />
  )
}

export default BasicInput