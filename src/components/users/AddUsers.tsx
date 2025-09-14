import { Select, SelectItem } from "@heroui/react";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import { useTranslation } from "react-i18next";
import MobileInput from "../general/MobileInput";
import { countries } from "countries-list";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createAdminUser, CreateAdminUserPayload } from "@/api/users/addUser";
import ImageInput from "@/components/general/ImageInput";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Country, getAllCountries } from "@/api/countries/getCountry";
import { useNavigate } from "react-router";

type SelectedCountry = { iso2: string; name: string; phone: string[] };

const getCountryByIso2 = (iso2: string): SelectedCountry => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [String(country.phone)],
  };
};

const AddUsers = () => {
  const { t, i18n } = useTranslation("users");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(
    getCountryByIso2("EG")
  );
  const [selectedCountryId, setSelectedCountryId] = useState<
    string | undefined
  >(undefined);
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // image state replaced by profileImage below
  const [profileImage, setProfileImage] = useState<File | null>(null);
  // removed unused countryId state; we use selectedCountryId instead
  const [cityId] = useState("");
  const navigate = useNavigate();
  // Fetch all countries (follow pagination) so the select shows every item
  const { data: allCountries } = useQuery<Country[]>({
    queryKey: ["countries", "all"],
    queryFn: () => getAllCountries(),
  });

  // no paginated query needed here — we use allCountries which follows pagination

  const handleSubmit = async () => {
    const payload: CreateAdminUserPayload = {
      name,
      email: email || undefined,
      phone,
      phone_country: selectedCountry.iso2,
      image: profileImage || undefined,
      country_id: selectedCountryId ? String(selectedCountryId) : undefined,
      city_id: cityId || undefined,
      password: password || undefined,
      password_confirmation: confirmPassword || undefined,
    };

    const getDisplayMessage = (raw: string) => {
      if (!raw) return t("somethingWentWrong");
      // If we have a translation key for common backend messages, use it.
      // defaultValue ensures we fall back to backend text if translation is missing.
      if (i18n.language === "ar") {
        if (
          raw.includes("linked to an account") ||
          raw.includes("already linked")
        )
          return t("phoneAlreadyLinked", { defaultValue: raw });
      }
      return raw;
    };

    const safeStringify = (v: unknown) => {
      try {
        return typeof v === "string" ? v : JSON.stringify(v);
      } catch {
        return undefined;
      }
    };

    const formatAndShowError = (err: unknown) => {
      // Prefer Error.message, fall back to stringified payload, otherwise translation
      let message = t("somethingWentWrong");
      if (typeof err === "string") message = err;
      else if (err instanceof Error && err.message) message = err.message;
      else {
        const s = safeStringify(err);
        if (s && s !== "{}") message = s;
      }
      toast.error(getDisplayMessage(message));
    };

    try {
      setIsSubmitting(true);
      await createAdminUser(payload);
      toast.success(t("userAdded"));
      navigate("/users");
    } catch (error: unknown) {
      formatAndShowError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <DashboardHeader
        titleAr={"إضافة مستخدم جديد"}
        titleEn={"Add a new user"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
          {
            titleAr: "إضافة مستخدم جديد",
            titleEn: "Add a new user",
            link: "/dashboard/addUsers",
          },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="p-8 bg-white rounded-2xl mb-4">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("profileImage")}
          </h3>
          <div className="relative">
            <ImageInput image={profileImage} setImage={setProfileImage} />
          </div>
        </div>

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
              items={allCountries || []}
              selectedKeys={selectedCountryId ? [selectedCountryId] : []}
              label={t("country")}
              placeholder={t("all")}
              classNames={{
                trigger: "h-[64px] !h-[64px] min-h-[64px] bg-white border",
                label: "!text-[15px] !text-[#000000]",
                listbox: "bg-white shadow-md",
              }}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string | undefined;
                if (!value) return;
                setSelectedCountryId(value);
                const country = allCountries?.find(
                  (c) => c.id.toString() === value
                );
                if (country) {
                  setSelectedCountry({
                    iso2: country.code || selectedCountry.iso2,
                    name:
                      (country.name && (country.name.ar || country.name.en)) ||
                      country.name?.en ||
                      selectedCountry.name,
                    phone: country.code
                      ? [String(country.code)]
                      : selectedCountry.phone,
                  });
                }
              }}
            >
              {(country) => (
                <SelectItem key={country.id.toString()}>
                  {i18n.language === "ar"
                    ? country.name.ar || country.name.en
                    : country.name.en}
                </SelectItem>
              )}
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
            <button
              type="button"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
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
          <button
            type="button"
            aria-label={
              showConfirmPassword ? t("hidePassword") : t("showPassword")
            }
            className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <DashboardButton
            titleAr={"اضافة"}
            titleEn={"Save"}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
