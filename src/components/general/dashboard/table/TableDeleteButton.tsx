import DeleteIcon from "@/components/icons/dashboard/DeleteIcon";
import React from "react";
import DeleteModal from "../../DeleteModal";

interface TableDeleteButtonProps {
  handleDelete: () => void;
}

const TableDeleteButton: React.FC<TableDeleteButtonProps> = ({
  handleDelete,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>
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
