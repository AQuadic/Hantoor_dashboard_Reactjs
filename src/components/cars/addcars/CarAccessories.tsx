import { Input } from "@heroui/react";
import React, { useState } from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import ImageInput from "@/components/general/ImageInput";
import { useTranslation } from "react-i18next";

const CarAccessories = () => {
  const { t } = useTranslation("cars");
  const [carDetailsFields, setCarDetailsFields] = useState<CarDetailsFieldsTypes[]>([
    {
      image: null,
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
    },
  ]);

  const addCarDetailsField = () => {
    setCarDetailsFields([
      ...carDetailsFields,
      {
        image: null,
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
      },
    ]);
  };

  const removeCarDetailsField = (index: number) => {
    const updatedFields = carDetailsFields.filter((_, i) => i !== index);
    setCarDetailsFields(updatedFields);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">{t('accessories')}</h1>
      {carDetailsFields.map((field, index) => (
        <div key={index} className="mt-4 flex items-center gap-4 pt-4">
          <span className="min-w-[65px]">
            <ImageInput image={field.image} setImage={() => {}} width={65} height={65} />
          </span>
          <div className="w-1/2">
            <Input
              label={t("arName")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={field.titleAr}
              onChange={() => {}}
            />
          </div>
          <div className="w-1/2">
            <Input
              label={t("enName")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={field.titleEn}
              onChange={() => {}}
            />
          </div>
          <div className="w-full">
            <Input
              label={t("price")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={field.descriptionEn}
              onChange={() => {}}
            />
          </div>
          {index !== 0 && (
            <span>
              <TableDeleteButton handleDelete={() => removeCarDetailsField(index)} />
            </span>
          )}

        </div>
      ))}

      <AddFieldButton title={t("addMoreData")} onClick={addCarDetailsField} />
    </div>
  );
};

export default CarAccessories;
