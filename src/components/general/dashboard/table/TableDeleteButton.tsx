import DeleteIcon from "@/components/icons/dashboard/DeleteIcon";
import React from "react";
import DeleteModal from "../../DeleteModal";

interface TableDeleteButtonProps {
  handleDelete: () => void;
  disabled?: boolean;
  className?: string;
}

const TableDeleteButton: React.FC<TableDeleteButtonProps> = ({
  handleDelete,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="">
      <button
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
        disabled={disabled}
        className={className}
      >
        <DeleteIcon />
      </button>
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TableDeleteButton;
