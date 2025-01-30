import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";


const TodoItem = ({data,checkBox}) => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        checked={data.checked}
        onCheckedChange={checkBox}
      />
      <p className={data.checked ? 'line-through' : ''}>{data.task}</p>
    </div>
  )
}

export default TodoItem
