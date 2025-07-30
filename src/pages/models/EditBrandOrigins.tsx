import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";

const EditBrandOrigins = () => {
  return (
    <div>
      <DashboardHeader
        titleAr="تعديل منشأ الماركة"
        titleEn="Edit brand origin"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr:"تعديل منشأ الماركة",
            titleEn: "Edit brand origin",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="اسم منشأ الماركة ( باللغة العربية )"
                variant="bordered"
                placeholder="أوروبا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
            </div>
            <Input
              label="اسم منشأ الماركة ( باللغة الانجليزية )"
              variant="bordered"
              placeholder="اكتب هنا"
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton titleAr="حفظ" titleEn="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditBrandOrigins;
