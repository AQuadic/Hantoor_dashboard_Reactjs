import React from "react";
import { Plus } from "lucide-react";

interface AddFieldButtonProps {
  onClick: () => void;
  title: string;
}

const AddFieldButton = ({ onClick, title }: AddFieldButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 text-primary flex items-center gap-2 border-2 border-dashed py-3 w-full rounded-2xl justify-center"
    >
      <Plus />
      <span>{title}</span>
    </button>
  );
};

export default AddFieldButton;
