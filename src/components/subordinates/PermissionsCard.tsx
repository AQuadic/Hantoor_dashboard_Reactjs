import React from "react";
import { PermissionStateTypes } from "@/types/PermissionTypes";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@heroui/react";

interface PermissionsCardProps {
  titleAr: string;
  titleEn: string;
  selectedPermissions: PermissionStateTypes[];
  setSelectedPermissions: (permissions: PermissionStateTypes[]) => void;
}

const PermissionsCard: React.FC<PermissionsCardProps> = ({
  titleAr,
  titleEn,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const {
    i18n: { language },t
  } = useTranslation("users");

  const handleSelectOne = (index: number) => {
    console.log(index);
    const newPermissions = [...selectedPermissions];
    newPermissions[index].isSelected = !newPermissions[index].isSelected;
    setSelectedPermissions(newPermissions);
  };

  const handleSelectAll = () => {
    const allSelected = selectedPermissions.every(
      (permission) => permission.isSelected,
    );
    const updatedPermissions = selectedPermissions.map((permission) => ({
      ...permission,
      isSelected: !allSelected,
    }));
    setSelectedPermissions(updatedPermissions);
  };

  return (
    <div
      className={"flex flex-col gap-4 p-4 rounded-2xl bg-white text-[#606060]"}
    >
      <div className={"flex items-center justify-between"}>
        <h3 className="mb-4 text-lg font-bold text-primary">
          {language === "ar" ? titleAr : titleEn}
        </h3>
        <Checkbox onChange={handleSelectAll}>{t('selectAll')}</Checkbox>
      </div>
      <div className={"flex flex-wrap gap-2"}>
        {selectedPermissions.map((permission, index) => (
          <Checkbox
            key={index}
            isSelected={permission.isSelected}
            onChange={() => handleSelectOne(index)}
          >
            {language === "ar"
              ? permission.permission.titleAr
              : permission.permission.titleEn}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};

export default PermissionsCard;
