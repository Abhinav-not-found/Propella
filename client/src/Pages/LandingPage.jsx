import React, { useEffect } from 'react'
import {Button} from '../components/ui/button'
import {useNavigate} from 'react-router-dom'
import LandingNavbar from '../components/Landing/LandingNavbar'
import LandingHero from '../components/Landing/LandingHero'
import LandingFooter from '../components/Landing/LandingFooter'
import axios from 'axios'

const LandingPage = () => {
  const navigate = useNavigate();
  const getAllUsers = async ()=>{
    const res =  await axios.get('https://propella-backend.vercel.app/api/users/getAllUsers',{withCredentials:true})
    console.log(res.data)
  }
  useEffect(() =>{
      getAllUsers()
      console.log('age')
  }, [])
  return (
    <div className='w-10/12 m-auto'>
      <LandingNavbar/>
      <LandingHero/>
      <LandingFooter/>
    </div>
  )
}

export default LandingPage
