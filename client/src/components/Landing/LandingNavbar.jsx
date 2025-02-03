import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CustomTabs from "../custom/CustomTabs";

const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-14 items-center justify-between w-full">
      <div>
        <p>Propella</p>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogHeader><DialogTitle></DialogTitle></DialogHeader>
          <DialogContent className="bg-transparent border-none">
            <DialogClose className="absolute top-2 right-2 text-white hover:text-gray-300 dark:text-black">
              ✕
            </DialogClose>
            <CustomTabs />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LandingNavbar;
