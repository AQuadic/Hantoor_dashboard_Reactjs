import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";

const AddEngineType = () => {
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
              <Input
                label="نوع الماكينة ( باللغة العربية )"
                variant="bordered"
                placeholder="بنزين"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
            </div>
            <Input
              label="نوع الماكينة ( باللغة الانجليزية )"
              variant="bordered"
              placeholder="اكتب هنا"
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton title="إضافة" />
        </div>
      </div>
    </div>
  );
};

export default AddEngineType;
