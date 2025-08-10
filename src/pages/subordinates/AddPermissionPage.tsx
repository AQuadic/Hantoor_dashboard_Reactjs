import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";
import PermissionsCard from "@/components/subordinates/PermissionsCard";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useTranslation } from "react-i18next";

interface Permission {
  permission: {
    titleEn: string;
    titleAr: string;
  };
  isSelected: boolean;
}

const AddPermissionPage = () => {
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
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
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Change password", titleAr: "تغيير كلمة المرور" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الصلاحيات",
          titleEn: "Permissions",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "المستخدمين",
          titleEn: "Users",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Change password", titleAr: "تغيير كلمة المرور" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Suspension period", titleAr: "مدة الايقاف" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "البلاد",
          titleEn: "Countries",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الماركات",
          titleEn: "Brands",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الوكلاء",
          titleEn: "Agents",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Link", titleAr: "الرابط" },
              isSelected: true,
            },
            {
              permission: { titleEn: "View", titleAr: "رؤية" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
      ],
    },
    {
      groupTitleAr: "اقسام السيارات",
      groupTitleEn: "System Management",
      isFullWidth: false,
      sections: [
        {
          titleAr: "الموديلات",
          titleEn: "Models",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "انواع الهيكل",
          titleEn: "Types of structure",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "انواع السيارة",
          titleEn: "Car types",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الفئات",
          titleEn: "Categories",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "منشأ الماركة",
          titleEn: "Brand Origin",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "عدد المقاعد",
          titleEn: "Number of seats",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "انواع الماكينة",
          titleEn: "Engine types",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "احجام الماكينة",
          titleEn: "Engine sizes",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "السعر من",
          titleEn: "Price from",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "السعر الى",
          titleEn: "Price to",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
      ],
    },
    {
      groupTitleAr: "",
      groupTitleEn: "",
      isFullWidth: false,
      sections: [
        {
          titleAr: "السيارات",
          titleEn: "Cars",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "التمويل",
          titleEn: "Financing",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "البنوك",
          titleEn: "Banks",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "المحادثات",
          titleEn: "Conversations",
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
          titleAr: "اسئلة الدعم الفني",
          titleEn: "Technical support questions",
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
        {
          titleAr: "رسائل الدعم",
          titleEn: "Support messages",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الاسئلة الشائعة",
          titleEn: "Frequently Asked Questions",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الاشعارات",
          titleEn: "Notifications",
           permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "تواصل معنا",
          titleEn: "Contact us",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
      ],
    },
    {
      groupTitleAr: "",
      groupTitleEn: "",
      isFullWidth: false,
      sections: [
        {
          titleAr: "اعدادت عامة",
          titleEn: "General settings",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "زر طلب تفاصيل سعر التأمين",
          titleEn: "Request insurance quote details button",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الصفحات التعريفية",
          titleEn: "Profile pages",
          permissions: [
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "الصور الاعلانية",
          titleEn: "Advertising images",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "الشروط والاحكام",
          titleEn: "Terms and Conditions",
            permissions: [
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
          ],
        },
        {
          titleAr: "روابط التواصل الاجتماعي",
          titleEn: "Social media links",
          permissions: [
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
          ],
        },
        {
          titleAr: "مميزات التطبيق",
          titleEn: "Application features",
          permissions: [
            {
              permission: { titleEn: "Status", titleAr: "الحالة" },
              isSelected: false,
            },
            {
              permission: { titleEn: "Edit", titleAr: "تعديل" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Delete", titleAr: "حذف" },
              isSelected: true,
            },
            {
              permission: { titleEn: "Add", titleAr: "اضافة" },
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
    newPermissions: Permission[]
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
          // {
          //   titleAr: " المسؤولين الفرعيين ",
          //   titleEn: "Subordinates",
          //   link: "/subordinates",
          // },
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
          <div key={groupIndex} className="space-y-4 border-b pb-5">
            {/* Group Title */}
            <h2 className="text-xl font-bold rtl:text-right text-black">
                  {currentLang === "ar" ? group.groupTitleAr : group.groupTitleEn}
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
                      newPermissions
                    )
                  }
                />
              ))}
            </div>
          </div>
        ))}
        <DashboardButton titleAr="اضافة" titleEn="Add" />
      </div>
    </section>
  );
};

export default AddPermissionPage;
