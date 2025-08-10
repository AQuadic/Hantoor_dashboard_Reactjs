import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AddSeats = () => {
  const { t } = useTranslation("models");
  const [arSeatsNumbers, setArSeatsNumbers] = useState("");
  const [enSeatsNumbers, setEnSeatsNumbers] = useState("");
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة عدد مقاعد جديدة"
        titleEn="Add new seats"
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
            titleAr: "اضافة عدد مقاعد جديدة",
            titleEn: "Add new seats",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arSeatsNumbers")}
                value={arSeatsNumbers}
                onChange={setArSeatsNumbers}
                placeholder="6"
              />
            </div>
            <DashboardInput
              label={t("enSeatsNumbers")}
              value={enSeatsNumbers}
              onChange={setEnSeatsNumbers}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddSeats;
