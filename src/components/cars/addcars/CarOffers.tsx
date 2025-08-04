import { Input, } from "@heroui/react";
import React from "react";
import { CarDetailsFieldsTypes } from "@/types/CarTypes";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import ImageInput from "@/components/general/ImageInput";
import { useTranslation } from "react-i18next";

interface CarDetailsFieldProps {
  field: CarDetailsFieldsTypes;
  handleDelete: () => void;
}

const CarOffers = ({ handleDelete }: CarDetailsFieldProps) => {
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
  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">{t('offers')}</h1>
    <div className="mt-4 flex items-center  gap-4 pt-4">
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
          label={t('arDetails')}
          variant="bordered"
          placeholder={t('writeHere')}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
        />
      </div>{" "}
      <div className="w-full">
        <Input
          label={t('enDetails')}
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
      <AddFieldButton
        title={t('addMoreData')}
        onClick={addCarDetailsField}
      />
    </div>
  );
};

export default CarOffers;
