import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const TodoItem = ({data,checkBox}) => {

  const handleDialog=()=>{
    
  }
  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        checked={data.checked}
        onCheckedChange={checkBox}
      />
      <Dialog>
        <DialogTrigger>
          <p onClick={handleDialog} className={data.checked ? 'line-through cursor-pointer hover:underline' : 'cursor-pointer hover:underline'}>{data.task}</p>
        </DialogTrigger>
        <DialogContent>
          <div>
            
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default TodoItem
