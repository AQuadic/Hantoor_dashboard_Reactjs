import React from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import { Input } from "@heroui/react";
import ImageInput from "@/components/general/ImageInput";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";

interface CarDetailsFieldProps {
  field: CarDetailsFieldsTypes;
}

const CarDetailsField = ({ field }: CarDetailsFieldProps) => {
  return (
    <div className="mt-4 flex items-center  gap-4 border-t pt-4">
      <span className="min-w-[65px]">
        {" "}
        <ImageInput image={null} setImage={() => {}} width={65} height={65} />
      </span>
      <div className="w-full">
        <Input
          label="الاسم (باللغة العربية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <div className="w-full">
        <Input
          label="الاسم  (باللغة الانجليزية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label="الوصف  (باللغة الانجليزية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label="الوصف  (باللغة الانجليزية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <span>
        <TableDeleteButton handleDelete={() => {}} />
      </span>
    </div>
  );
};

export default CarDetailsField;
