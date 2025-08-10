import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import ImageInput from "@/components/general/ImageInput";
import { Input } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const AddBrand = () => {
  const { t } = useTranslation("brands");
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  // const oldValues = {
  //   image: "aaa",
  //   name: "car name",
  // };

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة"}
        titleEn={isEdit ? "Edit Brand" : "Add Brand"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة",
            titleEn: isEdit ? "Edit Brand" : "Add Brand",
            link: isEdit ? `/brands/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t('brandImage')}</h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold ">{t('mainData')}</h3>
          <div className="flex gap-4">
            <Input
              label={t('arBrand')}
              variant="bordered"
              placeholder=" تويوتا"
                classNames={{
                  label: "mb-2 text-base",
                  input: "placeholder:text-sm placeholder:font-normal",
                }}
              size="lg"
            />
            <Input
              label={t('enBrand')}
              variant="bordered"
              placeholder={t('writeHere')}
              classNames={{
                  label: "mb-2 text-base",
                  input: "placeholder:text-sm placeholder:font-normal",
                }}
              size="lg"
            />
          </div>

          <DashboardButton titleAr=" اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
