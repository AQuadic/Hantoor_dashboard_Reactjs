import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import React from "react";
import { useParams } from "react-router";

const AddPermissionPage = () => {
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);
  return (
    <section>
      <DashboardHeader
        titleAr={isEdit ? " تعديل الصلاحية" : "اضافة صلاحية جديدة"}
        titleEn={isEdit ? "Edit Permission" : "Add Permission"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: " المسؤولين الفرعيين ",
            titleEn: "Subordinates",
            link: "/subordinates",
          },
          {
            titleAr: isEdit ? "تعديل الصلاحية" : "اضافة صلاحية جديدة",
            titleEn: isEdit ? "Edit Permission" : "Add Permission",
            link: isEdit ? `/permissions/${brandId}` : "/permissions/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl">
          <h3 className="mb-4 text-lg font-bold">الصورة الشخصية</h3>
        </div>
      </div>
    </section>
  );
};

export default AddPermissionPage;
