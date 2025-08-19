import { Input } from "@heroui/react";
import React, { useState } from "react";
import ImageInput from "../general/ImageInput";
import DashboardButton from "../general/dashboard/DashboardButton";
import { countries } from "countries-list";
import MobileInput from "../general/MobileInput";
import { useTranslation } from "react-i18next";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

interface EditProfileFormProps {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}
const EditProfileForm = ({
  profileImage,
  setProfileImage,
}: EditProfileFormProps) => {
  const { t } = useTranslation("profile");
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByIso2("EG")
  );
  const [phone, setPhone] = useState("");
  return (
    <form className="p-8">
      <div className="p-8 bg-white rounded-2xl ">
        <h3 className="mb-4 text-lg font-bold">{t("profileImage")}</h3>
        <ImageInput image={profileImage} setImage={setProfileImage} />
      </div>
      <div className="flex gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold ">{t("mainData")}</h3>

          <Input
            label={t("name")}
            variant="bordered"
            placeholder="محمد احمد"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
          />
          <Input
            label={t("email")}
            variant="bordered"
            placeholder="username@mail.com"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
          />
          <MobileInput
            label={t("phone")}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />
          <DashboardButton titleAr=" حفظ" titleEn="Save" />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold">{t("password")}</h3>
          <Input
            label={t("currentPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
          />
          <Input
            label={t("newPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
          />
          <Input
            label={t("confirmPassword")}
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
            size="lg"
          />
          <DashboardButton titleAr=" حفظ" titleEn="Save" />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
