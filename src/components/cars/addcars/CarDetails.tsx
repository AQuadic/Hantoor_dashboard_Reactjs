import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import CarDetailsField from "@/components/cars/addcars/CarDetailsField";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import { Plus } from "lucide-react";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";

const CarDetails = () => {
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
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">بيانات السيارة</h1>
      <div className="flex flex-col md:flex-row gap-[15px] ">
        <div className="w-full">
          <Input
            label="اسم السيارة (باللغة العربية)"
            variant="bordered"
            placeholder="اكتب هنا"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
        </div>
        <div className="w-full">
          <Input
            label="اسم السيارة (باللغة الانجليزية)"
            variant="bordered"
            placeholder="اكتب هنا"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
        <Select
          label="البلد"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="الماركة"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="الوكيل"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="الموديل"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="نوع الهيكل"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="النوع"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="الفئة"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="منشأ الماركة"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="عدد المقاعد"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="نوع الماكينة"
          variant="bordered"
          placeholder=" اختر"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        >
          <SelectItem>test </SelectItem>
        </Select>{" "}
        <Select
          label="حجم الماكينة"
          variant="bordered"
          placeholder=" اختر"
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
