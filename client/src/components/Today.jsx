import React, { useEffect, useState } from 'react';
import CustomDialog from './custom/CustomDialog';
import { Checkbox } from "@/components/ui/checkbox";

const Today = () => {
  //! make api for add task and display here
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl">Today</h1>
      <div className="mt-5">
        <div className="px- flex gap-2 items-center">
          <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
          <p className={isChecked ? 'line-through' : ''}>this is a task</p>
        </div>
        <CustomDialog />
      </div>
    </div>
  );
};

export default Today;
