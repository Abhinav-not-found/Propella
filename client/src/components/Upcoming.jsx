import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Upcoming = () => {
  
  const [upcomingTasks,setUpcomingTasks]=useState([])
  console.log(upcomingTasks)

  const getUpcomingTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/tasks/getAllTasks');
      if (res.status === 200) {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
  
        const tasksForToday = res.data.filter((task) => {
          return task.date.split('T')[0] > formattedToday;
        });
  
        setUpcomingTasks(tasksForToday.filter((data) => data.checked === false));
        // setCheckedTasks(tasksForToday.filter((data) => data.checked === true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpcomingTasks();
  }, []);


  return (
    <div>
      <h1 className="font-semibold text-2xl">Upcoming Tasks</h1>
      <div>
        {upcomingTasks.map((data,index)=>(
          <p key={index}>{data.task}</p>
        ))}
      </div>
    </div>
  )
}

export default Upcoming
