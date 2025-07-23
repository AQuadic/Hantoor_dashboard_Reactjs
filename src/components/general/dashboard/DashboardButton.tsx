import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";

interface DashboardButtonProps {
  title: string;
  variant?: "primary" | "add";
  isLoading?: boolean;
  onClick?: () => void;
}

const AddIcon = () => {
  return (
    <div className="bg-white/30 p-1 rounded-full border-2 border-white">
      <Plus size={16} />
    </div>
  );
};

const DashboardButton: React.FC<DashboardButtonProps> = ({
  title,
  onClick,
  variant,
  isLoading = false,
}) => {
  const isAdd = variant === "add";
  return (
    <Button
      isLoading={isLoading}
      color="primary"
      className={`w-[200px] py-6 rounded-[9px] flex items-center font-bold ${
        isAdd && "justify-between rounded-full"
      } text-center`}
      onPress={onClick}
      {...(isAdd && {
        endContent: <AddIcon />,
      })}
      fullWidth
    >
      {title}
    </Button>
  );
};

export default DashboardButton;
