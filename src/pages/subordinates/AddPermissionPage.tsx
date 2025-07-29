import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";
import PermissionsCard from "@/components/subordinates/PermissionsCard";

const AddPermissionPage = () => {
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const [panelPermissions, setPanelPermissions] = React.useState<
    {
      permission: { titleEn: string; titleAr: string };
      isSelected: boolean;
    }[]
  >([
    {
      permission: { titleEn: "Dashboard", titleAr: "لوحة التحكم" },
      isSelected: true,
    },
    {
      permission: {
        titleEn: "Number of logged-in users",
        titleAr: "عدد المستخدمين المسجلين",
      },
      isSelected: false,
    },
    {
      permission: {
        titleEn: "Number of advanced search uses",
        titleAr: "عدد مرات البحث المتقدم",
      },
      isSelected: true,
    },
    {
      permission: {
        titleEn: "Number of times price details requested",
        titleAr: "عدد مرات طلب تفاصيل سعر السيارة",
      },
      isSelected: true,
    },
    {
      permission: {
        titleEn: "Number of brands",
        titleAr: "عدد الماركات",
      },
      isSelected: false,
    },
    {
      permission: {
        titleEn: "Number of cars with discount",
        titleAr: "عدد السيارات التي تحتوي على خصم",
      },
      isSelected: false,
    },
    {
      permission: {
        titleEn: "Number of cars on offer",
        titleAr: "عدد السيارات التي تحتوي على عرض",
      },
      isSelected: false,
    },
    {
      permission: {
        titleEn: "Number of dealerships",
        titleAr: "عدد الوكالات",
      },
      isSelected: false,
    },
    {
      permission: {
        titleEn: "Number of trade-in and financing cars",
        titleAr: "عدد السيارات التجاري و تقسيط بالتقسيط",
      },
      isSelected: false,
    },
  ]);

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
      <div className="flex flex-col gap-8 p-8 pt-0 bg-white rounded-b-2xl">
        <Input
          label="اسم الصلاحية"
          variant="bordered"
          value={"مدير"}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          className="max-w-[680px]"
        />
      </div>
      <div className={"px-8 py-4"}>
        <PermissionsCard
          titleAr="لوحة التحكم"
          titleEn="Control panel"
          selectedPermissions={panelPermissions}
          setSelectedPermissions={(newPermissions) =>
            setPanelPermissions(newPermissions)
          }
        />
      </div>
    </section>
  );
};

export default AddPermissionPage;
