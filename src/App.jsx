import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import './App.css'
import "./Components/Header/Header.css"; 
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  

  return (
    <>
    <ToastContainer />
    <Router>
     <Routes>
      
      <Route path="/" element={<SignUp />} />
      <Route path= "/dashboard" element={<Dashboard />} />
     </Routes>
    </Router>
    </>
  )
}

export default App
