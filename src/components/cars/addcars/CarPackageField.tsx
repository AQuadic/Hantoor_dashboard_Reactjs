import React from "react";
import { CarPackageFieldsTypes } from "@/types/CarTypes";
import ImageInput from "@/components/general/ImageInput";
import { Input } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";

interface CarPackageFieldProps {
  index: number;
  pkg: CarPackageFieldsTypes;
  handleDelete: () => void;
}

const CarPackageField = ({
  index,
  pkg,
  handleDelete,
}: CarPackageFieldProps) => {
  return (
    <div className="mt-4 flex items-center  gap-4 ">
      <div className="min-w-1/4">
        <Input
          label="المدة/المسافة (باللغة العربية)"
          variant="bordered"
          placeholder="1 سنة او 20.000 كم"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <div className="min-w-1/4">
        <Input
          label="المدة/المسافة (باللغة الانجليزية)"
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label="السعر"
          variant="bordered"
          placeholder="1000 درهم"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      {index > 0 && (
        <span>
          <TableDeleteButton handleDelete={handleDelete} />
        </span>
      )}
    </div>
  );
};

export default CarPackageField;
