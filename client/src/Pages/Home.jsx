import React from 'react'

const Home = () => {
  return (
    <div className='flex'>
      <div className='SIDEBAR w-1/5  h-screen'></div>
      <div className='w-4/5 h-screen'>
        <div className='NAVBAR w-full h-20 bg-gray-100'></div>
        <div className='MAIN w-full h-full bg-red-100'></div>
      </div>
    </div>
  )
}

export default Home

