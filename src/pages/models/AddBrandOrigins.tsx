import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AddBrandOrigins = () => {
  const { t } = useTranslation("models");
  const [arBrandName, setArBrandName] = useState("");
  const [enBrandName, setEnBrandName] = useState("");
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
            titleAr: "اضافة منشأ ماركة جديد",
            titleEn: "Add a new brand origin",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arBrandName")}
                value={arBrandName}
                onChange={setArBrandName}
                placeholder="أوروبا"
              />
            </div>
            <DashboardInput
              label={t("enBrandName")}
              value={enBrandName}
              onChange={setEnBrandName}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddBrandOrigins;
