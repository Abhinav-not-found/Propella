import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<PublicRoute><LandingPage/></PublicRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
