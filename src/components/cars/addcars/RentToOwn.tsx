import { Switch } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const RentToOwn = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
          {t("rentToOwn")}
        </h1>
        <Switch
          isSelected={formData?.is_rent_to_own || false}
          onValueChange={(value) => updateField?.("is_rent_to_own", value)}
          size="sm"
          color="primary"
        />
      </div>
    </div>
  );
};

export default RentToOwn;
