import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog"
import {Input} from '@/components/ui/input'
import { Button } from './ui/button';
import axios from 'axios';


const TodoItem = ({data,checkBox}) => {

  const [editingTask,setEditingTask]=useState(data.task)
  const [isDialogOpen,setIsDialogOpen]=useState(false)

  const handleUpdateTask=async()=>{
    try {
      const res = await axios.put(`http://localhost:8080/api/tasks/updateTask/${data._id}`,{updatedText:editingTask})
      if(res.status === 200){
        setIsDialogOpen(false)
        data.task = editingTask
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateTask();
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        checked={data.checked}
        onCheckedChange={checkBox}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <p className={data.checked ? 'line-through cursor-pointer hover:underline' : 'cursor-pointer hover:underline'}>{data.task}</p>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <p>Task Edit</p>
          </DialogTitle>
          <div className='w-full h-full'>
            <Input type="text" value={editingTask} onChange={(e)=>setEditingTask(e.target.value)} className='bg-transparent' onKeyDown={handleKeyDown} />
            <div className='flex justify-between items-center mt-5'>
              <div className='flex gap-3'>
                <Button variant='secondary' className='opacity-60'>Add Priority</Button>
                <Button variant='secondary' className='opacity-60'>Add Tag</Button>
              </div>
              <Button onClick={handleUpdateTask}>Update</Button>
            </div>
            
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default TodoItem
