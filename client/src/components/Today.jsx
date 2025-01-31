import React, { useEffect, useState } from 'react';
import CustomDialog from './custom/CustomDialog';
import { X } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import TodoItem from './TodoItem';

const Today = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  // console.log(allTasks)
  // console.log(checkedTasks)

  const { toast } = useToast();

  const getAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/tasks/getAllTasks');
      if (res.status === 200) {
        setAllTasks(res.data.filter((data)=>data.checked === false)); 
        setCheckedTasks(res.data.filter((data)=>data.checked === true))
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
      const res = await axios.put(`http://localhost:8080/api/tasks/updateChecked/${task._id}`, {
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
      const res = await axios.delete(`http://localhost:8080/api/tasks/deleteTask/${id}`);
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

  return (
    <div>
      <h1 className="font-semibold text-2xl">Today</h1>
      <div className="mt-5">
        <div className="flex flex-col gap-2 pl-2 mb-2">
          {allTasks.map((data, index) => (
            <div key={index} className="flex items-center w-2/3 justify-between rounded-md p-2">
              <TodoItem data={data} checkBox={()=>handleCheckboxChange(index)} />
              <div className='flex items-center gap-3'>
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
