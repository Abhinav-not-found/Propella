import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Music, Palette, Timer } from "lucide-react";
import { Button } from "./ui/button";
import CustomSearchBar from "./custom/CustomSearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  return (
    <div className="flex py-2">
      {/* <CustomSearchBar/> */}
      {/* <Button variant="ghost" size="icon">
        <Music />
      </Button>
      <Button variant="ghost" size="icon">
        <Timer />
      </Button>
      <Button variant="ghost" size="icon">
        <Palette />
      </Button>

      <ModeToggle />

      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
      <Button onClick={()=>navigate('/login')}>Login</Button> */}
      
      Navbar
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Navbar;
