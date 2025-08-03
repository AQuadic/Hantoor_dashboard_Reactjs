import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
// import DashboardPhoneInput from "@/components/general/dashboard/DashboardPhoneInput";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import { Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { countries } from "countries-list";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};


const AddSubordinatePage = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const params = useParams();
  const managerId = params.id;
  const isEdit = Boolean(managerId);
    const [selectedCountry, setSelectedCountry] = useState(
        getCountryByIso2("EG")
    );
    const [phone, setPhone] = useState("");
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
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
            />
          <MobileInput
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              phone={phone}
              setPhone={setPhone}
          />
          </div>

          <div className="flex gap-4">
            <Input
              label="البريد الإلكتروني"
              variant="bordered"
              placeholder="username@mail.com"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
              type="email"
            />
            <Select
              label="الصلاحيات"
              variant="bordered"
              placeholder="اختر الصلاحية"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
            >
              {authorities.map((authority) => (
                <SelectItem key={authority.key} textValue={authority.label}>
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
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
              type="password"
            />
            <Input
              label="تأكيد كلمة المرور"
              variant="bordered"
              placeholder="••••••••••••••••"
              classNames={{ label: "mb-2 text-base !text-[#080808]" }}
              size="lg"
              type="password"
            />
          </div>

          <DashboardButton 
            titleEn={"Add"}
            titleAr={"اضافة"}  
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubordinatePage;
