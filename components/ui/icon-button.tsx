import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";

interface IconButtonProps {
  icon: React.ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
