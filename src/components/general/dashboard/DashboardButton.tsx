import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface DashboardButtonProps {
  titleEn: string;
  titleAr: string;
  variant?: "primary" | "add";
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const AddIcon = () => {
  return (
    <div className="p-1 border-2 border-white rounded-full bg-white/30">
      <Plus size={16} />
    </div>
  );
};

const DashboardButton: React.FC<DashboardButtonProps> = ({
  titleEn,
  titleAr,
  onClick,
  variant,
  isLoading = false,
  type = "button",
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isAdd = variant === "add";

  return (
    <Button
      type={type}
      isLoading={isLoading}
      className={`bg-[#2A32F8] text-white min-w-[200px] max-w-fit py-6 rounded-[9px] flex items-center font-bold ${
        isAdd && "gap-4 rounded-full min-w-[160px] justify-start"
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
      {isArabic ? titleAr : titleEn}
    </Button>
  );
};

export default DashboardButton;
