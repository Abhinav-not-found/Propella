import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Home from './Pages/Home'
const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
