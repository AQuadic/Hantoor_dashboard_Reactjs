import React from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import { Input } from "@heroui/react";
import ImageInput from "@/components/general/ImageInput";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";

interface CarDetailsFieldProps {
  field: CarDetailsFieldsTypes;
  handleDelete: () => void;
  onUpdate: (field: Partial<CarDetailsFieldsTypes>) => void;
}

const CarDetailsField = ({
  field,
  handleDelete,
  onUpdate,
}: CarDetailsFieldProps) => {
  const { t } = useTranslation("cars");
  return (
    <div className="mt-4 flex items-center  gap-4 border-t pt-4">
      <span className="min-w-[65px]">
        {" "}
        <ImageInput
          image={field.image}
          setImage={(imageOrAction) => {
            const newImage =
              typeof imageOrAction === "function"
                ? imageOrAction(field.image)
                : imageOrAction;
            onUpdate({ image: newImage });
          }}
          width={65}
          height={65}
        />
      </span>
      <div className="w-full">
        <Input
          label={t("arName")}
          variant="bordered"
          placeholder={t("writeHere")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={field.titleAr}
          onValueChange={(value) => onUpdate({ titleAr: value })}
        />
      </div>
      <div className="w-full">
        <Input
          label={t("enName")}
          variant="bordered"
          placeholder={t("writeHere")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={field.titleEn}
          onValueChange={(value) => onUpdate({ titleEn: value })}
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label={t("arDescription")}
          variant="bordered"
          placeholder={t("writeHere")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={field.descriptionAr}
          onValueChange={(value) => onUpdate({ descriptionAr: value })}
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label={t("enDescription")}
          variant="bordered"
          placeholder={t("writeHere")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={field.descriptionEn}
          onValueChange={(value) => onUpdate({ descriptionEn: value })}
        />
      </div>
      <span>
        <TableDeleteButton handleDelete={handleDelete} />
      </span>
    </div>
  );
};

export default CarDetailsField;
