import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const CustomDialog = ({ getAllTasks }) => {
  const [task, setTask] = useState('');
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post('http://localhost:8080/api/tasks/create', { task: task });
      if (res.status === 201) {
        console.log(res.data);
        toast({
          title: "Task Created Successfully ✅",
        });
        setTask('');
        getAllTasks(); // Refetch tasks
        setIsDialogOpen(false); // Close dialog after task is added
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> {/* Control dialog visibility */}
      <DialogTrigger asChild>
        <Button variant='ghost' className='flex justify-start'>
          <Plus /> Add task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <div className='my-5'>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
