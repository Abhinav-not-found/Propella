import axios from 'axios'
import React, { useEffect, useState } from 'react'
import YearlyGoals from './Home/YearlyGoals'
import backendUri from '../utils/config'



const Home = () => {
  const [userInfo,setUserInfo]=useState('')
  const userId = localStorage.getItem('userId')
  const getUserInfo = async() =>{
    try {
      const res = await axios.get(`${backendUri}/api/users/getUserInfo/${userId}`)
      if(res.status===200){
        // console.log(res.data.data)
        setUserInfo(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
      getUserInfo()
  }, [])
   //! continue making yearly goals and saving them in backend, if no yearly goals are there for this user(localstorage(userId)) then add a button to set goals
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full h-32 capitalize bg-red-100 rounded-md p-4'>
      Welcome {userInfo.name}
      </div>
      <div className='flex justify-between'>
        <YearlyGoals/>
        <div className='w-1/3 h-60 bg-red-50'>
        Monthly task chart
        </div>
      </div>
      <div className='w-full h-32 bg-red-100'>
        dot tracker
      </div>
    </div>
  )
}

export default Home
