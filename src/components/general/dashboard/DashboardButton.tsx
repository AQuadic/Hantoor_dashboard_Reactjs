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
    <div className="p-1 border-2 border-white rounded-full bg-white/30">
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
      type="button"
      isLoading={isLoading}
      color="primary"
      className={`min-w-[200px] max-w-fit py-6 rounded-[9px] flex items-center font-bold ${
        isAdd && "justify-between rounded-full"
      } text-center`}
      onPress={() => {
        if (onClick) {
          onClick();
        }
      }}
      {...(isAdd && {
        startContent: <AddIcon />,
      })}
      fullWidth
    >
      {title}
    </Button>
  );
};

export default DashboardButton;
