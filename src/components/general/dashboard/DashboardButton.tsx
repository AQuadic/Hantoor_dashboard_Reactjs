import { Button } from "@heroui/react";
import React from "react";

interface DashboardButtonProps {
  title: string;
  variant?: "primary";
  onClick?: () => void;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <Button
      color="primary"
      className="px-16 py-3 rounded-[9px]"
      onPress={onClick}
    >
      {title}
    </Button>
  );
};

export default DashboardButton;
