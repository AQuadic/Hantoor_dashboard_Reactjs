import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const AddBrandOrigins = () => {
  const { t } = useTranslation("models");
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة منشأ ماركة جديد"
        titleEn="Add a new brand origin"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/",
          },
          {
            titleAr:"اضافة منشأ ماركة جديد",
            titleEn: "Add a new brand origin",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arBrandName')}
                variant="bordered"
                placeholder="أوروبا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
            </div>
            <Input
              label={t('enBrandName')}
              variant="bordered"
              placeholder={t('writeHere')}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

              <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddBrandOrigins;
