import React from 'react'
import { Button } from '../components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Tag, CalendarDays,House,Calendar, } from "lucide-react"

const Home = () => {
  return (
    <div className='flex'>
      <div className='SIDEBAR w-1/5 h-screen p-5 flex flex-col gap-5 border-r-2'>
        <Button variant='ghost' className='w-full flex justify-start'><House />Home</Button>
        <Button variant='ghost' className='w-full flex justify-start'><Calendar />Today</Button>
        <Button variant='ghost' className='w-full flex justify-start'><CalendarDays />Upcoming</Button>
        {/* <Separator /> */}
        <Button variant='ghost' className='w-full text-start flex justify-start'><Tag />Tags
        </Button>
      </div>
      <div className='w-4/5 h-screen'>
        <div className='NAVBAR w-full h-20'></div>
        <div className='MAIN w-full h-full'></div>
      </div>
    </div>
  )
}

export default Home

