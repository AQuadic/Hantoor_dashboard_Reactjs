import { Select, SelectItem } from "@heroui/react";
import DashboardInput from "@/components/general/DashboardInput";
import React from "react";
import CarDetailsField from "@/components/cars/addcars/CarDetailsField";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";
import { VehicleFeature } from "@/api/vehicles/fetchVehicles";

const CarDetails = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField, features, addFeature, removeFeature } =
    useVehicleForm();

  const addCarDetailsField = () => {
    addFeature?.();
  };

  const removeCarDetailsField = (index: number) => {
    removeFeature?.(index);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
        {t("carDetails")}
      </h1>
      <div className="flex flex-col md:flex-row gap-[15px] ">
        <div className="w-full">
          <DashboardInput
            label={t("arCarName")}
            value={formData?.nameAr || ""}
            onChange={(value) => updateField?.("nameAr", value)}
            placeholder={t("writeHere")}
          />
        </div>
        <div className="w-full">
          <DashboardInput
            label={t("enCarName")}
            value={formData?.nameEn || ""}
            onChange={(value) => updateField?.("nameEn", value)}
            placeholder={t("writeHere")}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
        <Select
          label={t("country")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("brand")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("agent")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("model")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("structureType")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("type")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("category")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("brandOrigin")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("seats")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("engineType")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t("engineSize")}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>
      </div>

      <div>
        {features?.map((feature: VehicleFeature, index: number) => (
          <CarDetailsField
            handleDelete={() => removeCarDetailsField(index)}
            field={{
              image: feature.image as File | null,
              titleEn: feature.name?.en || "",
              titleAr: feature.name?.ar || "",
              descriptionEn: feature.description?.en || "",
              descriptionAr: feature.description?.ar || "",
            }}
            key={index}
          />
        ))}
      </div>
      <AddFieldButton title={t("addMoreData")} onClick={addCarDetailsField} />
    </div>
  );
};

export default CarDetails;
