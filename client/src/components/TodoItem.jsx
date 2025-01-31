import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDatePicker from './custom/CustomDatePicker'

const TodoItem = ({ data, checkBox, onUpdateTask }) => {

  const [editingTask, setEditingTask] = useState(data.task);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priority,setPriority]=useState(data.priority)
  const [selectedDate,setSelectedDate]=useState(null)
  
  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/tasks/updateTask/${data._id}`,
        { updatedText: editingTask,priority:priority,date:selectedDate}
      );
      if (res.status === 200) {
        setIsDialogOpen(false);
        data.task = editingTask;
        const updatedData = { ...data, task: editingTask, priority: priority };
      onUpdateTask(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={data.checked} onCheckedChange={checkBox} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <p
            className={
              data.checked
                ? "line-through cursor-pointer hover:underline capitalize"
                : "cursor-pointer hover:underline capitalize"
            }
          >
            {data.task}
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <p>Task Edit</p>
          </DialogTitle>
          <div className="w-full h-full">
            <Input
              type="text"
              value={editingTask}
              onChange={(e) => setEditingTask(e.target.value)}
              className="bg-transparent"
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-3 mt-3">
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={priority || 'Priority'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" className="opacity-60">
                Add Tag
              </Button>
            </div>
            <div className="flex justify-between items-center mt-3">
              <CustomDatePicker onDateChange={handleDateChange} />
              <Button onClick={handleUpdateTask}>Update</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoItem;
