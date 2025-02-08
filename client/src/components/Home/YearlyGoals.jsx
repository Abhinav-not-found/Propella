import { Check, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import arrowSvg from "../../assets/svg/arrow.svg";
import { Skeleton } from "@/components/ui/skeleton"
import backendUri from '../../utils/config.js'


const YearlyGoals = () => {
  const userId = localStorage.getItem("userId");
  const [yearlyInput, setYearlyInput] = useState("");
  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading,setLoading]=useState(true)

  const getYearlyGoalsData = async () => {
    try {
      const res = await axios.get(
        `${backendUri}/api/users/getYearlyGoals/${userId}`
      );
      if (res.status === 200) {
        setYearlyGoals(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getYearlyGoalsData();
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && isDialogOpen && yearlyInput.trim() !== "") {
        handleAddYearlyGoals();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDialogOpen, yearlyInput]);
  
  const handleAddYearlyGoals = async () => {
    try {
      const res = await axios.post(
        `${backendUri}/api/users/addYearlyGoals/${userId}`,
        { yearlyInput }
      );
      if (res.status === 200) {
        // console.log(res.data);
        setIsDialogOpen(false)
        setYearlyInput("");
      getYearlyGoalsData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteYearlyGoals = async (goalText) => {
    try {
      const res = await axios.delete(
        `${backendUri}/api/users/deleteYearlyGoal/${userId}`,
        { data: { goalText } }
      );
      if (res.status === 200) {
        console.log("Goal deleted successfully");
        getYearlyGoalsData();
      }
    } catch (error) {
      console.error("Failed to delete the goal", error);
    }
  };
  
  

  return (
    <div className="w-1/3 h-60 bg-red-50 px-5 py-4 rounded-md overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Yearly Goals</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button>
              <Plus />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="font-semibold">Yearly Goals</DialogTitle>
            <div className="flex flex-row gap-4">
              <Input
                value={yearlyInput}
                onChange={(e) => setYearlyInput(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleAddYearlyGoals} className="w-fit">
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {loading && yearlyGoals.length === 0 ?
      <Skeleton className="w-[100px] mt-1 h-[20px] rounded-full" />
      :
      <>
        <div className="relative">
        {yearlyGoals.length > 0 ? (
          yearlyGoals.map((goal, index) => {
            return (
              <div key={index} className="flex items-center gap-2 mb-2">
                <p className="flex-1 text-lg">{goal}</p>
                <button
                  onClick={() => handleComplete(index)}
                  className="text-black rounded hover:text-green-600"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteYearlyGoals(goal)}
                  className="text-black rounded hover:text-red-500"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            );
          })
        ) : (
          <>
            <div className="absolute top-10 left-16 text-center -rotate-[12deg]">
              <p className="opacity-50 font-IndieFlower text-2xl">No goals yet?</p>
              <p className="opacity-50 font-IndieFlower text-2xl">Try adding some!</p>
            </div>
            <div>
              <img src={arrowSvg} className="-rotate-[90deg] w-16 h-16 opacity-50 absolute top-5 right-3" />
            </div>
          </>
        )}
      </div>
      </>}
      
    </div>
  );
};

export default YearlyGoals;
