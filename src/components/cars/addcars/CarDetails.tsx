import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import CarDetailsField from "@/components/cars/addcars/CarDetailsField";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { useTranslation } from "react-i18next";

const CarDetails = () => {
  const { t } = useTranslation("cars");
  const [carDetailsFields, setCarDetailsFields] = React.useState<
    CarDetailsFieldsTypes[]
  >([
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
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">{t('carDetails')}</h1>
      <div className="flex flex-col md:flex-row gap-[15px] ">
        <div className="w-full">
          <Input
            label={t('arCarName')}
            variant="bordered"
            placeholder={t('writeHere')}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
        </div>
        <div className="w-full">
          <Input
            label={t('enCarName')}
            variant="bordered"
            placeholder={t('writeHere')}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
        <Select
          label={t('country')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('brand')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('agent')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('model')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('structureType')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('type')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('category')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('brandOrigin')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('seats')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('engineType')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label={t('engineSize')}
          variant="bordered"
          placeholder={t('choose')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>
      </div>

      <div>
        {carDetailsFields.map((field, index) => (
          <CarDetailsField
            handleDelete={() => removeCarDetailsField(index)}
            field={field}
            key={index}
          />
        ))}
      </div>
      <AddFieldButton
        title={" اضافة بيانات اخرى"}
        onClick={addCarDetailsField}
      />
    </div>
  );
};

export default CarDetails;
