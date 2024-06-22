import React from 'react'
import "../../App.css"
const Button = ({text, onClick, blue, disabled, type="button" }) => {
  return (
    <div className={blue?"btn btn-blue":"btn"} onClick={onClick} disabled={disabled} type={type}>
      {text}
    </div>
  )
}

export default Button
