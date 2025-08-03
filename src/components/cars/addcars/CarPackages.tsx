import React, { useState } from "react";
import { CarPackageFieldsTypes } from "@/types/CarTypes";
import CarPackageField from "@/components/cars/addcars/CarPackageField";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { Switch } from "@heroui/react";

const CarPackages = () => {
  const [packages, setPackages] = useState<CarPackageFieldsTypes[]>([
    {
      distanceAr: "",
      distanceEn: "",
      price: 0,
    },
  ]);
  const addPackage = () => {
    setPackages([
      ...packages,
      {
        distanceAr: "",
        distanceEn: "",
        price: 0,
      },
    ]);
  };
  const removePackage = (index: number) => {
    const updatedPackages = packages.filter((pkg, i) => i !== index);
    setPackages(updatedPackages);
  };
  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <div className="flex items-center  justify-between ">
        <h1 className="text-lg text-primary font-bold mb-2"> باقات الصيانة</h1>
        <Switch />
      </div>
      {packages.map((pkg, index) => (
        <CarPackageField
          index={index}
          key={index}
          pkg={pkg}
          handleDelete={() => removePackage(index)}
        />
      ))}

      <AddFieldButton onClick={addPackage} title="اضافة باقات صيانة اخرى" />
    </div>
  );
};

export default CarPackages;
