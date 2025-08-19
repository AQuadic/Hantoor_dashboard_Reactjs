import { createFeatureApp, FeatureAppBody } from "@/api/featuresApp/postFeatures";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import ImageInput from "@/components/general/ImageInput";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AddFeatures = () => {
  const { t } = useTranslation("setting");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async () => {
  setIsSubmitting(true);

  const body: FeatureAppBody = {
    description: {
      ar: arDescription,
      en: enDescription,
    },
    is_active: true,
  };

  try {
    const response = await createFeatureApp(body);
    console.log("Feature created:", response);
    setArDescription("");
    setEnDescription("");
    setProfileImage(null);
    toast.success(t("featureAddedSuccessfully"));
    navigate("/settings?section=App Features");
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      t("somethingWentWrong");
    toast.error(message);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة مميزات جديدة"
          titleEn="Add new features"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            { titleAr: "اضافة مميزات جديدة", titleEn: "Add new features" },
          ]}
        />
      </div>
      <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
        <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t("image")}</h3>
        <ImageInput
          image={profileImage}
          setImage={setProfileImage}
          placeholderText={t("addGIF")}
        />
      </div>
      <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arDescription")}
              value={arDescription}
              onChange={setArDescription}
              placeholder={t("exploreNewCars")}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enDescription")}
              value={enDescription}
              onChange={setEnDescription}
              placeholder={t("writeHere")}
            />
          </div>
        </div>
        <div className="mt-5">
          <DashboardButton titleAr="اضافة" titleEn="Add" onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default AddFeatures;
