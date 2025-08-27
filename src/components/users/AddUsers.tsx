import { Select, SelectItem } from "@heroui/react";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { countries } from "countries-list";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createAdminUser, CreateAdminUserPayload } from "@/api/users/addUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { CountriesResponse, getCountries } from "@/api/countries/getCountry";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, ] = useState<File | null>(null);
  const [countryId, ] = useState("");
  const [cityId, ] = useState("");

  const { data: countriesData } = useQuery<CountriesResponse>({
    queryKey: ["countries"],
    queryFn: () => getCountries(1),
  });
  
  const handleSubmit = async () => {
    const payload: CreateAdminUserPayload = {
      name,
      email: email || undefined,
      phone,
      phone_country: selectedCountry.iso2,
      image: image || undefined,
      country_id: countryId || undefined,
      city_id: cityId || undefined,
      password: password || undefined,
      password_confirmation: confirmPassword || undefined,
    };

    try {
      await createAdminUser(payload);
      toast.success("User created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create user.");
    }
  };

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
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
            placeholder="username"
          />
          <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">{t("name")}</h2>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              items={countriesData?.data.map((c) => ({ key: c.id.toString(), label: c.name.ar })) || []}
              label={t("country")}
              placeholder={t("all")}
              classNames={{
                trigger: "h-[64px] !h-[64px] min-h-[64px] bg-white border",
                label: "!text-[15px] !text-[#000000]",
                listbox: "bg-white shadow-md",
              }}
              onVolumeChange={(event) => {
                const value = event.target.value;
                const country = countriesData?.data.find((c) => c.id.toString() === value);
                if (country) setSelectedCountry(country);
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <DashboardButton titleAr={"اضافة"} titleEn={"Save"} onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
