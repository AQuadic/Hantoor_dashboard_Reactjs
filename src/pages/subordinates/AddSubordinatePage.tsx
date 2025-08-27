import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
// import DashboardPhoneInput from "@/components/general/dashboard/DashboardPhoneInput";
import ImageInput from "@/components/general/ImageInput";
import MobileInput from "@/components/general/MobileInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { countries } from "countries-list";
import { useTranslation } from "react-i18next";
import { createAdmin } from "@/api/admins/addAdmin";
import toast from "react-hot-toast";

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
  const { t } = useTranslation("subordinates");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const authorities = [
    { key: "manager", label: "مدير" },
    { key: "secretary", label: "سكرتير" },
    { key: "employee", label: "عامل" },
    { key: "supervisor", label: "مسؤول" },
  ];

    const handleSubmit = async () => {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const newAdmin = await createAdmin({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        });
        toast.success(t("adminAddedSuccessfully"))
        navigate("/subordinates");
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };


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
          <h3 className="mb-4 text-lg font-bold">{t("personalImage")}</h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold">{t("mainData")}</h3>

          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <DashboardInput
                label={t("name")}
                value={name}
                onChange={setName}
                placeholder="محمد احمد"
              />
            </div>
            <div className="w-full">
              <MobileInput
                label={t("phone")}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                phone={phone}
                setPhone={setPhone}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <DashboardInput
                label={t("email")}
                value={email}
                onChange={setEmail}
                placeholder="username@mail.com"
              />
            </div>
            <div className="w-full">
              <Select
                label={t("permissions")}
                variant="bordered"
                placeholder={t("choosePermission")}
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
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <DashboardInput
              label={t("password")}
              value={password}
              onChange={setPassword}
              placeholder="••••••••••••••••"
            />
            <DashboardInput
              label={t("confirmPassword")}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="••••••••••••••••"
            />
          </div>

          <DashboardButton titleEn={"Add"} titleAr={"اضافة"} onClick={handleSubmit} isLoading={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default AddSubordinatePage;
