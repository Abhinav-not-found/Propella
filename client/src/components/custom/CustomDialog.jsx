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

const CustomDialog = ({ getAllTasks }) => {
  const [task, setTask] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priority,setPriority]=useState('')

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post("http://localhost:8080/api/tasks/create", {
        task: task,priority:priority
      });
      if (res.status === 201) {
        console.log(res.data);
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
            />
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-3">
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
                onClick={handleAddTask}
                variant="secondary"
                className="opacity-60"
              >
                Tag
              </Button>
            </div>
            <Button onClick={handleAddTask}>Add</Button>
          </div>
          </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
