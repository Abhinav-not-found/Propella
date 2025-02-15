import React, { useEffect, useState } from 'react';
import CustomDialog from './custom/CustomDialog';
import { X } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import TodoItem from './TodoItem';
import CustomTooltip from './custom/CustomTooltip'
import backendUri from '../utils/config';



const Today = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  // console.log(allTasks)
  // console.log(checkedTasks)

  const { toast } = useToast();

  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${backendUri}/api/tasks/getAllTasks`);
      if (res.status === 200) {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
  
        const tasksForToday = res.data.filter((task) => {
          return task.date.split('T')[0] <= formattedToday;
        });
  
        setAllTasks(tasksForToday.filter((data) => data.checked === false));
        setCheckedTasks(tasksForToday.filter((data) => data.checked === true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleCheckboxChange = async (index) => {
    const task = allTasks[index] || checkedTasks[index];
    const updatedTask = { ...task, checked: !task.checked };
    // console.log(updatedTask)
  
    try {
      const res = await axios.put(`${backendUri}/api/tasks/updateChecked/${task._id}`, {
        isChecked: updatedTask.checked,
      });
  
      if (res.status === 200) {
        const updatedTasks = allTasks.filter((_, i) => i !== index);
        setAllTasks(updatedTask.checked ? updatedTasks : [...updatedTasks, updatedTask]);
        setCheckedTasks(updatedTask.checked ? [...checkedTasks, updatedTask] : checkedTasks.filter(t => t._id !== task._id));
      }
    } catch (error) {
      console.log('Error updating task:', error);
      toast({
        title: "Error updating task",
        description: "There was an issue with updating the task.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`${backendUri}/api/tasks/deleteTask/${id}`);
      if (res.status === 200) {
        setAllTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
        setCheckedTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
        toast({
          title: "Task Deleted 🗑️",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskUpdate = (updatedTask)=>{
    if(updatedTask.checked){
      setCheckedTasks((prev)=>{
        prev.map(task=>task._id === updatedTask._id ? updatedTask : task)
      })
    }
    else{
      setAllTasks((prev) =>
        prev.map(task => task._id === updatedTask._id ? updatedTask : task)
      );
    }
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl">Today</h1>
      <div className="mt-5">
        <div className="flex flex-col gap-2 pl-2 mb-2">
          {allTasks.map((data, index) => (
            <div key={index} className="flex items-center w-2/3 justify-between rounded-md p-2">
              <TodoItem data={data} checkBox={()=>handleCheckboxChange(index)} onUpdateTask={handleTaskUpdate} />
              <div className='flex items-center gap-3'>

                <div className='opacity-60'>{data.date.split('T')[0]}</div>

                <CustomTooltip data={data}/>

                <button onClick={() => handleDeleteTask(data._id)}>
                  <X className='hover:text-red-400' />
                </button>
              </div>
            </div>
          ))}
        </div>
        <CustomDialog getAllTasks={getAllTasks} />
        <div className='opacity-20 pl-4 pt-5'>
          {checkedTasks.map((data, index) => (
            <div key={index} className="flex items-center w-2/3 justify-between ">
              <TodoItem data={data} checkBox={()=>handleCheckboxChange(index)} />
              <div>
                <button onClick={() => handleDeleteTask(data._id)}>
                  <X className='hover:text-red-400' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Today;
