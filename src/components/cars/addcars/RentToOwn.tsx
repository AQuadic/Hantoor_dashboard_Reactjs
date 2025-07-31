import { Input, } from "@heroui/react";
import React from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import ImageInput from "@/components/general/ImageInput";

const RentToOwn = ( ) => {
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
  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">إيجار منتهي بالتملك</h1>
    <div className="mt-4 flex items-center  gap-4 pt-4">
      <span className="min-w-[65px]">
        {" "}
        <ImageInput image={null} setImage={() => {}} width={65} height={65} />
      </span>
      <div className="w-full">
        <Input
          label="المدة (باللغة العربية)"
          variant="bordered"
          placeholder="3 سنوات"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <div className="w-full">
        <Input
          label="المدة (باللغة الانجليزية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label="رقم الواتساب"
          variant="bordered"
          placeholder="123456789"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label="السعر"
          variant="bordered"
          placeholder="100.000 درهم"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
    </div>
      <AddFieldButton
        title={" اضافة بيانات اخرى"}
        onClick={addCarDetailsField}
      />
    </div>
  );
};

export default RentToOwn;
