import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";
import PermissionsCard from "@/components/subordinates/PermissionsCard";

const AddPermissionPage = () => {
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  // Control panel permissions (first, without group title)
  const [controlPanelPermissions, setControlPanelPermissions] = React.useState([
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

  // Grouped permission sections
  const [permissionGroups, setPermissionGroups] = React.useState([
    {
      groupTitleAr: "المسؤولين الفرعيين",
      groupTitleEn: "Subordinates",
      sections: [
        {
          titleAr: "المسؤولين الفرعيين",
          titleEn: "Subordinates",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
            {
              permission: {
                titleEn: "Full Authority",
                titleAr: "كامل الصلاحية",
              },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "الصلاحيات",
          titleEn: "Permissions",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
            {
              permission: {
                titleEn: "Full Authority",
                titleAr: "كامل الصلاحية",
              },
              isSelected: true,
            },
          ],
        },
      ],
    },
    {
      groupTitleAr: "إدارة النظام",
      groupTitleEn: "System Management",
      isFullWidth: false,
      sections: [
        {
          titleAr: "المستخدمين",
          titleEn: "Users",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
            {
              permission: {
                titleEn: "Full Authority",
                titleAr: "كامل الصلاحية",
              },
              isSelected: true,
            },
            {
              permission: {
                titleEn: "Application Period",
                titleAr: "مدة الاشتراك",
              },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "البلاد",
          titleEn: "Countries",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "الماركات",
          titleEn: "Brands",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "الوكلاء",
          titleEn: "Agents",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Read", titleAr: "قراءة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Administration", titleAr: "الادارة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: true,
            },
          ],
        },
      ],
    },
    {
      groupTitleAr: "إدارة المحتوى",
      groupTitleEn: "Content Management",
      isFullWidth: false,
      sections: [
        {
          titleAr: "المديريات",
          titleEn: "Directorates",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "انواع الهيكل",
          titleEn: "Body Types",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "View", titleAr: "الاطلاع" },
              isSelected: false,
            },
          ],
        },
      ],
    },
  ]);

  const updatePermissionSection = (
    groupIndex: number,
    sectionIndex: number,
    newPermissions: any[],
  ) => {
    const updatedGroups = [...permissionGroups];
    updatedGroups[groupIndex].sections[sectionIndex].permissions =
      newPermissions;
    setPermissionGroups(updatedGroups);
  };

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
      <div className="px-8 py-4 space-y-8">
        {/* Control Panel Card - First without title */}
        <div>
          <PermissionsCard
            titleAr="لوحة التحكم"
            titleEn="Control Panel"
            selectedPermissions={controlPanelPermissions}
            setSelectedPermissions={setControlPanelPermissions}
          />
        </div>

        {/* Grouped Permission Sections */}
        {permissionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {/* Group Title */}
            <h2 className="text-xl font-bold text-black text-right">
              {group.groupTitleAr}
            </h2>

            {/* Permission Cards */}
            <div
              className={
                group.isFullWidth
                  ? "space-y-4"
                  : "grid grid-cols-1 md:grid-cols-2 gap-4"
              }
            >
              {group.sections.map((section, sectionIndex) => (
                <PermissionsCard
                  key={sectionIndex}
                  titleAr={section.titleAr}
                  titleEn={section.titleEn}
                  selectedPermissions={section.permissions}
                  setSelectedPermissions={(newPermissions) =>
                    updatePermissionSection(
                      groupIndex,
                      sectionIndex,
                      newPermissions,
                    )
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddPermissionPage;
