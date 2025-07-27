import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardPhoneInput from "@/components/general/dashboard/DashboardPhoneInput";
import ImageInput from "@/components/general/ImageInput";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";

const AddSubordinatePage = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const params = useParams();
  const managerId = params.id;
  const isEdit = Boolean(managerId);

  const authorities = [
    { key: "manager", label: "مدير" },
    { key: "secretary", label: "سكرتير" },
    { key: "employee", label: "عامل" },
    { key: "supervisor", label: "مسؤول" },
  ];

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل مسؤول فرعي" : "إضافة مسؤول فرعي جديد"}
        titleEn={isEdit ? "Edit Branch Manager" : "Add New Branch Manager"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "لوحة التحكم",
            titleEn: "Dashboard",
            link: "/dashboard",
          },
          {
            titleAr: "المسؤولين الفرعيين",
            titleEn: "Branch Managers",
            link: "/branch-managers",
          },
          {
            titleAr: isEdit ? "تعديل مسؤول فرعي" : "إضافة مسؤول فرعي جديد",
            titleEn: isEdit ? "Edit Branch Manager" : "Add New Branch Manager",
            link: isEdit
              ? `/branch-managers/${managerId}`
              : "/branch-managers/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl">
          <h3 className="mb-4 text-lg font-bold">الصورة الشخصية</h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold">البيانات الأساسية</h3>

          <div className="flex gap-4">
            <Input
              label="الاسم"
              variant="bordered"
              placeholder="محمد احمد"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
            <Input
              label=" رقم الجوال"
              variant="bordered"
              placeholder="0123456789"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <div className="flex gap-4">
            <Input
              label="البريد الإلكتروني"
              variant="bordered"
              placeholder="username@mail.com"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              type="email"
            />
            <Select
              label="الصلاحيات"
              variant="bordered"
              placeholder="اختر الصلاحية"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            >
              {authorities.map((authority) => (
                <SelectItem key={authority.key} value={String(authority.key)}>
                  {authority.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex gap-4">
            <Input
              label="كلمة المرور"
              variant="bordered"
              placeholder="••••••••••••••••"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              type="password"
            />
            <Input
              label="تأكيد كلمة المرور"
              variant="bordered"
              placeholder="••••••••••••••••"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              type="password"
            />
          </div>

          <DashboardButton title="إضافة" />
        </div>
      </div>
    </div>
  );
};

export default AddSubordinatePage;
