import React from "react";
import CarPackageField from "@/components/cars/addcars/CarPackageField";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarPackages = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField, packages, addPackage, removePackage } =
    useVehicleForm();

  const handleToggle = (value: boolean) => {
    // Just toggle the state - don't manipulate the data
    updateField("is_packages_active", value);

    // Only add initial item if enabling and there are no items
    if (value && packages.length === 0) {
      addPackage();
    }
  };

  const addCarPackage = () => {
    // Auto-enable when adding if not already enabled
    if (!formData.is_packages_active) {
      updateField("is_packages_active", true);
    }
    addPackage();
  };

  const removeCarPackage = (index: number) => {
    removePackage(index);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <div className="flex items-center  justify-between ">
        <h1 className="text-lg text-primary font-bold mb-2">
          {t("maintenancePackages")}
        </h1>
        <Switch
          isSelected={formData.is_packages_active || false}
          onValueChange={handleToggle}
          size="sm"
          color="primary"
        />
      </div>
      {formData.is_packages_active &&
        packages.map((pkg, index) => (
          <CarPackageField
            index={index}
            key={index}
            pkg={pkg}
            handleDelete={() => removeCarPackage(index)}
          />
        ))}

      {formData.is_packages_active && (
        <AddFieldButton onClick={addCarPackage} title={t("addMoreData")} />
      )}
    </div>
  );
};

export default CarPackages;
