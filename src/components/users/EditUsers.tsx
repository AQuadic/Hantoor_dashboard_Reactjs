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
import Loading from "../general/Loading";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  const [image, ] = useState<File | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");

  const { data: countriesData } = useQuery<CountriesResponse>({
    queryKey: ["countries"],
    queryFn: () => getCountries(1),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getAdminUser(userId)
      .then((user: AdminUser) => {
        setName(user.name);
        setEmail(user.email || "");
        setPhone(user.phone || "");
        if (user.country_id) setSelectedCountryId(user.country_id.toString());
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId) return toast.error("User ID is missing!");

    const payload: UpdateAdminUserPayload = {
      name,
      email,
      phone,
      phone_country: selectedCountryId,
      image: image || undefined,
      country_id: selectedCountryId || undefined,
    };

    try {
      const updatedUser = await updateAdminUser(userId, payload);
      console.log("User updated:", updatedUser);
      toast.success("User updated successfully!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        error?.message ||
        "Failed to update user";
      console.error("Failed to update user:", error.response || error.message);
      toast.error(message);
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
          <div className="relative md:w-1/2 w-full mt-[18px] rtl:pl-2 ltr:pr-2">
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
              const value = (event.target as HTMLSelectElement).value;
              const country = countriesData?.data.find((c) => c.id.toString() === value);
              if (country) setSelectedCountry(country);
            }}
            >
              {(country) => <SelectItem>{country.label}</SelectItem>}
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr={"حفظ"} titleEn={"Save"} onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default EditUsers;
