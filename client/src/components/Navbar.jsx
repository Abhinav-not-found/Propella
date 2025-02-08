import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

 

  return (
    <div className="flex py-2 px-10 justify-end">
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

      */}

      <ModeToggle />
      <div className="ml-2">
        {token ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-full flex flex-col gap-2">
                <Button className="w-full" variant="secondary">
                  Settings
                </Button>
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
