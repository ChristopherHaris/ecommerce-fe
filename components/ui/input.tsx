import { cn } from "@/lib/utils";
import React from "react";

interface Input {
  value: number;
  quantity: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<Input> = ({ value, quantity, onChange, className }) => {
  return (
    <input
      className={cn(
        "rounded-md flex text-center justify-center bg-white border shadow-md p-1 w-10",
        className
      )}
      max={quantity}
      min={1}
      value={value}
      onChange={onChange}
      readOnly
    ></input>
  );
};

export default Input;
