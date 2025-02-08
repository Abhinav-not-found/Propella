import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDatePicker from "./CustomDatePicker";
import backendUri from "../../utils/config";

const CustomDialog = ({ getAllTasks }) => {
  const [task, setTask] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [selectedDate,setSelectedDate]=useState(null)
  // const localDate = new Date(selectedDate).toLocaleDateString('en-CA');
  // console.log(selectedDate)
  // const currentDate = new Date;

  const handleAddTask = async () => {
    if (!task.trim()) return;
    const taskDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-CA')
    : new Date().toLocaleDateString('en-CA')
    try {
      const res = await axios.post(`${backendUri}/api/tasks/create`, {
        task: task,
        priority: priority,
        date:taskDate
      });
      if (res.status === 201) {
        // console.log(res.data);
        toast({
          title: "Task Created Successfully ✅",
        });
        setTask("");
        getAllTasks();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {" "}
      {/* Control dialog visibility */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex justify-start">
          <Plus /> Add task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <div className="">
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Title"
            />
            <div className="flex items-center gap-3 mt-3">
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={''}
                variant="secondary"
                className="opacity-60"
              >
                Tag
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <CustomDatePicker onDateChange={handleDateChange} />
              <Button onClick={handleAddTask}>Add</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
