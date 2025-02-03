import React from 'react'
import {Button} from '../components/ui/button'
import {useNavigate} from 'react-router-dom'
import LandingNavbar from '../components/Landing/LandingNavbar'
import LandingHero from '../components/Landing/LandingHero'
import LandingFooter from '../components/Landing/LandingFooter'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='w-10/12 m-auto'>
      <LandingNavbar/>
      <LandingHero/>
      <LandingFooter/>
    </div>
  )
}

export default LandingPage
