import { Select, SelectItem } from "@heroui/react";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { countries } from "countries-list";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const AddUsers = () => {
  const { t } = useTranslation("users");
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countries = [
    { key: "1", label: "مصر" },
    { key: "2", label: "مصر" },
    { key: "3", label: "مصر" },
    { key: "4", label: "مصر" },
    { key: "5", label: "مصر" },
    { key: "6", label: "مصر" },
  ];
  return (
    <section>
      <DashboardHeader
        titleAr={"إضافة مستخدم جدبد"}
        titleEn={"Add a new user"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
          {
            titleAr: "إضافة مستخدم جدبد",
            titleEn: "Add a new user",
            link: "/dashboard/addUsers",
          },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        {/* Name */}
        <div className="relative">
          <input
            type="name"
            name="name"
            id="name"
            className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
            placeholder="username@mail.com"
          />
          <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
            {t("name")}
          </h2>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              id="email"
              className=" w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
              placeholder="username@mail.com"
            />
            <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
              {t("email")}
            </h2>
            <div className="absolute top-9 left-5"></div>
          </div>
          {/* Phone */}
          <div className="relative w-full mt-[15px]">
            <MobileInput
              label={t("phone")}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              phone={phone}
              setPhone={setPhone}
            />
            <div className="absolute top-9 left-5"></div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="relative w-full mt-[18px]">
            <Select
              items={countries}
              label={t("country")}
              placeholder={t("all")}
              classNames={{
                trigger: "h-[64px] !h-[64px] min-h-[64px] bg-white border",
                label: "!text-[15px] !text-[#000000]",
                listbox: "bg-white shadow-md",
              }}
            >
              {(country) => <SelectItem>{country.label}</SelectItem>}
            </Select>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
              placeholder="********************"
            />
            <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
              {t("password")}
            </h2>
            <div
              className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative lg:w-1/2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm password"
            id="confirm password"
            className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
            placeholder="********************"
          />
          <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
            {t("confirmPassword")}
          </h2>
          <div
            className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr={"اضافة"} titleEn={"Save"} />
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
