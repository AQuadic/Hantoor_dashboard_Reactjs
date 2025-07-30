import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";

const EditEngineSize = () => {
  return (
    <div>
      <DashboardHeader
        titleAr="تعديل حجم الماكينة"
        titleEn="Edit engine size"
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
            titleAr: "تعديل حجم الماكينة",
            titleEn: "Edit engine size",
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

              <DashboardButton titleAr="حفظ" titleEn="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditEngineSize;
