import EditIcon from "@/components/icons/dashboard/EditIcon";
import React from "react";

interface TableEditButtonProps {
  handleEdit?: () => void;
}

const TableEditButton: React.FC<TableEditButtonProps> = ({ handleEdit }) => {
  return (
    <button onClick={handleEdit}>
      <EditIcon />
    </button>
  );
};

export default TableEditButton;
