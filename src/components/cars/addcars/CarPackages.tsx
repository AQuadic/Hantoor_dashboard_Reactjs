import React from "react";
import CarPackageField from "@/components/cars/addcars/CarPackageField";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarPackages = () => {
  const { t } = useTranslation("cars");
  const { packages, addPackage, removePackage } = useVehicleForm();

  const addCarPackage = () => {
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
        <Switch />
      </div>
      {packages.map((pkg, index) => (
        <CarPackageField
          index={index}
          key={index}
          pkg={pkg}
          handleDelete={() => removeCarPackage(index)}
        />
      ))}

      <AddFieldButton onClick={addCarPackage} title={t("addMoreData")} />
    </div>
  );
};

export default CarPackages;
