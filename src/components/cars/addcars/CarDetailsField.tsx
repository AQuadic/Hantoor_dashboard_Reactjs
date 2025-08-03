import React from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import { Input } from "@heroui/react";
import ImageInput from "@/components/general/ImageInput";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";

interface CarDetailsFieldProps {
  field: CarDetailsFieldsTypes;
  handleDelete: () => void;
}

const CarDetailsField = ({ field, handleDelete }: CarDetailsFieldProps) => {
  const { t } = useTranslation("cars");
  return (
    <div className="mt-4 flex items-center  gap-4 border-t pt-4">
      <span className="min-w-[65px]">
        {" "}
        <ImageInput image={null} setImage={() => {}} width={65} height={65} />
      </span>
      <div className="w-full">
        <Input
          label={t('arName')}
          variant="bordered"
          placeholder={t('writeHere')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <div className="w-full">
        <Input
          label={t('enName')}
          variant="bordered"
          placeholder={t('writeHere')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label={t('arDescription')}
          variant="bordered"
          placeholder={t('writeHere')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label={t('enDescription')}
          variant="bordered"
          placeholder={t('writeHere')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>
      <span>
        <TableDeleteButton handleDelete={handleDelete} />
      </span>
    </div>
  );
};

export default CarDetailsField;
