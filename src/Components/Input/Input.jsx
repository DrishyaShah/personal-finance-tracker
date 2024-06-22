import React from 'react'
import "./Input.css"
const Input = ({label, state, setState, type="text" , placeholder, className}) => {
  return (
    <div className='input-wrapper'>
      <p className='label'>{label}</p>
      <input value={state}
      placeholder={placeholder}
      type={type}
      
       onChange={(e) => setState(e.target.value)} 
       className={`custom-input ${className}`} />
    </div>
  )
}

export default Input
