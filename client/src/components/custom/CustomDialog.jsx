import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"

const CustomDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='flex justify-start'><Plus />Add task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <div className='my-5'>
            <Input/>
          </div>
          <Button>Add</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
