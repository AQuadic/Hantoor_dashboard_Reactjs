import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AddEngineType = () => {
  const { t } = useTranslation("models");
  const [arEngineType, setArEngineType] = useState("");
  const [enEngineType, setEnEngineType] = useState("");
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة نوع ماكينة جديدة"
        titleEn="Add new engine type"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "أقسام السيارات",
            titleEn: "Car Sections",
            link: "/",
          },
          {
            titleAr: "اضافة نوع ماكينة جديدة",
            titleEn: "Add new engine type",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arEngineType")}
                value={arEngineType}
                onChange={setArEngineType}
                placeholder={t("gasoline")}
              />
            </div>
            <DashboardInput
              label={t("enEngineType")}
              value={enEngineType}
              onChange={setEnEngineType}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddEngineType;
