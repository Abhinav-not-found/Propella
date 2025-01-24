import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Tag, CalendarDays,House,Calendar, } from "lucide-react"
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Tags from '../components/Tags'
import Upcoming from '../components/Upcoming'
import Today from '../components/Today'

const Dashboard = () => {
  const [menu,setMenu]=useState(2);
  return (
    <div className='flex'>
      <div className='SIDEBAR w-1/5 h-screen p-5 flex flex-col gap-5 border-r-2'>
        <Button variant='ghost' onClick={()=>setMenu(1)} className='w-full flex justify-start'><House />Home</Button>
        <Button variant='ghost' onClick={()=>setMenu(2)} className='w-full flex justify-start'><Calendar />Today</Button>
        <Button variant='ghost' onClick={()=>setMenu(3)} className='w-full flex justify-start'><CalendarDays />Upcoming</Button>
        {/* <Separator /> */}
        <Button variant='ghost' onClick={()=>setMenu(4)} className='w-full text-start flex justify-start'><Tag />Tags
        </Button>
      </div>
      <div className='w-4/5 h-screen'>
        <div className='NAVBAR w-full h-20'>
          <Navbar/>
        </div>
        <div className='MAIN w-full h-full px-10'>
          {menu === 1 ? <Home/>
          :
          menu === 2 ? <Today/>
          :
          menu === 3 ? <Upcoming/>
          :
          menu === 4 ? <Tags/>
          :<></>
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard

