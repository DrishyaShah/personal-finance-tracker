import React from 'react'
import Header from '../Components/Header/Header'
import '../App.css'
import Login from '../Components/LoginRegister/Login'
const SignUp = () => {
  return (
    <div>
        <Header />
     <div className='wrapper'>
     <Login />
     </div>
    </div>
  )
}

export default SignUp
