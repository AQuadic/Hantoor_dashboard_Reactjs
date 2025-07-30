import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";

const AddEnginSize = () => {
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة حجم ماكينة جديدة"
        titleEn="Add new engine size"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "أقسام السيارات",
            titleEn: "Car Sections",
            link: "/models",
          },
          {
            titleAr: "اضافة حجم ماكينة جديدة",
            titleEn: "Add new engine size",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="حجم الماكينة ( باللغة العربية )"
                variant="bordered"
                placeholder="1200 CC"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
            </div>
            <Input
              label="حجم الماكينة ( باللغة الانجليزية )"
              variant="bordered"
              placeholder="اكتب هنا"
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

export default AddEnginSize;
