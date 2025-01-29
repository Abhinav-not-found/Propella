import React, { useEffect, useState } from 'react';
import CustomDialog from './custom/CustomDialog';
import { Checkbox } from "@/components/ui/checkbox";
import { X } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"

const Today = () => {
  const [allTasks, setAllTasks] = useState([]);
    const {toast} =useToast()

  const getAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/tasks/getAllTasks');
      if (res.status === 200) {
        const tasksWithCheckboxState = res.data.map(task => ({
          ...task,
          isChecked: false,
        }));
        setAllTasks(tasksWithCheckboxState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleCheckboxChange = async(index) => {
    try {
      const res = await axios.put('')
    } catch (error) {
      
    }
    setAllTasks((prevTasks) => {
      return prevTasks.map((task, i) =>
        i === index ? { ...task, isChecked: !task.isChecked } : task
      );
    });
  };
  const addTaskToList = (newTask) => {
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async(id) =>{
    try {
      const res = await axios.delete(`http://localhost:8080/api/tasks/deleteTask/${id}`)
      if(res.status === 200){
        console.log(res.data)
        setAllTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
        toast({
          title: "Task Deleted 🗑️",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl">Today</h1>
      <div className="mt-5">
        <div className="flex flex-col gap-2 pl-4 mb-2">
          {allTasks.map((data, index) => (  
            <div key={index} className="flex items-center w-2/3 justify-between ">
              <div className='flex items-center gap-2'>
                <Checkbox
                  checked={data.isChecked}
                  onCheckedChange={() => handleCheckboxChange(index)}
                  />
                <p className={data.isChecked ? 'line-through' : ''}>{data.task}</p>
              </div>
              <div>
                <button onClick={()=>handleDeleteTask(data._id)}>
                <X className='hover:text-red-400'/>
                </button>
              </div>
            </div>
          ))}
        </div>
        <CustomDialog getAllTasks={getAllTasks} />
      </div>
    </div>
  );
};

export default Today;
