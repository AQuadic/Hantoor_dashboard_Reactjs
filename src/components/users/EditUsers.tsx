import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateAdminUser, UpdateAdminUserPayload } from "@/api/users/editUsers";
import { AdminUser, getAdminUser } from "@/api/users/getUserById";
import { CountriesResponse, getCountries } from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import DashboardButton from "../general/dashboard/DashboardButton";
import { Select, SelectItem } from "@heroui/react";
import MobileInput from "../general/MobileInput";
import { countries } from "countries-list";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import ImageInput from "../general/ImageInput";
import Loading from "../general/Loading";
import { useNavigate } from "react-router";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const EditUsers = () => {
  const { t } = useTranslation("users");
  const { id } = useParams<{ id: string }>();
  const userId = id;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // selectedPhoneCountry is used only for the MobileInput (phone's country code)
  // It is intentionally decoupled from the country select (which sets `country_id`).
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");

  const { data: countriesData } = useQuery<CountriesResponse>({
    queryKey: ["countries"],
    queryFn: () => getCountries(1),
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    getAdminUser(userId)
      .then((user: AdminUser) => {
        setName(user.name);
        setEmail(user.email || "");

        if (user.phone && user.phone_country) {
          const countryMeta = getCountryByIso2(user.phone_country);
          const dialCode = countryMeta.phone[0]; // e.g. "20" for EG
          const regex = new RegExp(`^\\+?${dialCode}`);
          setPhone(user.phone.replace(regex, ""));
        } else {
          setPhone(user.phone || "");
        }

        if (user.country_id) {
          setSelectedCountryId(user.country_id.toString());
        }

        // Initialize the phone-country used by the MobileInput independently
        if (user.phone_country) {
          setSelectedPhoneCountry(getCountryByIso2(user.phone_country));
        }

        if (user.image?.url) {
          setExistingImageUrl(user.image.url);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const safeStringify = (v: unknown) => {
    try {
      return typeof v === "string" ? v : JSON.stringify(v);
    } catch {
      return undefined;
    }
  };

  const getDisplayMessage = (raw: string) => {
    if (!raw) return t("somethingWentWrong");
    if (raw.includes("linked to an account") || raw.includes("already linked"))
      return t("phoneAlreadyLinked", { defaultValue: raw });
    return raw;
  };

  const extractBackendMessage = (err: unknown): string | undefined => {
    const respData = (err as { response?: { data?: unknown } })?.response?.data;
    if (respData) {
      if (typeof respData === "string") return respData;
      const obj = respData as Record<string, unknown>;
      if (typeof obj.message === "string") return obj.message;
      const firstErr = obj.errors && Object.values(obj.errors)[0];
      if (Array.isArray(firstErr) && typeof firstErr[0] === "string")
        return firstErr[0];
    }
    if (err instanceof Error && err.message) return err.message;
    if (typeof err === "string") return err;
    return undefined;
  };

  const formatAndShowError = (err: unknown) => {
    const backendMsg = extractBackendMessage(err);
    const rawMessage =
      backendMsg ?? safeStringify(err) ?? t("somethingWentWrong");
    console.error("Failed to update user:", err);
    toast.error(getDisplayMessage(String(rawMessage)));
  };

  const handleSubmit = async () => {
    if (!userId) return toast.error("User ID is missing!");
    if (!name.trim()) return toast.error(t("nameRequired"));
    if (!email.trim()) return toast.error(t("emailRequired"));
    if (!phone.trim()) return toast.error(t("phoneRequired"));

    const payload: UpdateAdminUserPayload = {
      name,
      email,
      phone,
      // submit the phone country coming from the MobileInput state
      phone_country: selectedPhoneCountry.iso2,
      country_id: selectedCountryId || undefined,
    };

    try {
      setIsSubmitting(true);
      const payloadWithImage: UpdateAdminUserPayload = {
        ...payload,
        image: profileImage || undefined,
      };
      const updatedUser = await updateAdminUser(userId, payloadWithImage);
      console.log("User updated:", updatedUser);
      toast.success(t("userUpdated"));
      navigate("/users");
    } catch (err: unknown) {
      formatAndShowError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section>
      <DashboardHeader
        titleAr={"تعديل المستخدم"}
        titleEn={"Edit user"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
          { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
          {
            titleAr: "تعديل المستخدم",
            titleEn: "Edit user",
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
            <ImageInput
              image={profileImage ?? existingImageUrl}
              setImage={setProfileImage}
              existingImageUrl={existingImageUrl}
            />
          </div>
        </div>
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
            placeholder="username"
          />
          <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
            {t("name")}
          </h2>
          <div className="absolute top-9 left-5"></div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px]">
          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              id="email"
              className=" w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              // mobile input's country (phone country) is separate from the form country select
              selectedCountry={selectedPhoneCountry}
              setSelectedCountry={setSelectedPhoneCountry}
              phone={phone}
              setPhone={setPhone}
            />
            <div className="absolute top-9 left-5"></div>
          </div>
        </div>

        {/* image input is rendered at the top of the form */}

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="relative md:w-1/2 w-full mt-[18px] rtl:pl-2 ltr:pr-2">
            <Select
              selectedKeys={selectedCountryId ? [selectedCountryId] : []}
              // Changing the country select must NOT change the phone-country used by the MobileInput.
              // Only update `selectedCountryId` which maps to `country_id` submitted to the API.
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                setSelectedCountryId(value);
              }}
              items={
                countriesData?.data.map((c) => ({
                  key: c.id.toString(),
                  label: c.name.ar,
                })) || []
              }
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
        </div>

        <div className="mt-4">
          <DashboardButton
            titleAr={"حفظ"}
            titleEn={"Save"}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </section>
  );
};

export default EditUsers;
