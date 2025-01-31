import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Music, Palette, Timer } from "lucide-react";
import { Button } from "./ui/button";
import CustomSearchBar from "./custom/CustomSearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="flex py-2">
      {/* <CustomSearchBar/> */}
      <Button variant="ghost" size="icon">
        <Music />
      </Button>
      <Button variant="ghost" size="icon">
        <Timer />
      </Button>
      <Button variant="ghost" size="icon">
        <Palette />
      </Button>

      <ModeToggle />
      
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
