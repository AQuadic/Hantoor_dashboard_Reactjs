import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import Delete from "@/components/icons/setting/Delete";
import { editFeature } from "@/api/featuresApp/editFeatures";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";
import { Feature, getFeatureById } from "@/api/featuresApp/getFeatureById";
import ImageInput from "@/components/general/ImageInput";

const EditFeatures = () => {
  const { t } = useTranslation("setting");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: feature, isLoading } = useQuery<Feature>({
    queryKey: ["feature", id],
    queryFn: () => getFeatureById(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    if (feature) {
      setArDescription(feature.description.ar);
      setEnDescription(feature.description.en);
      setIsActive(feature.is_active);
    }
  }, [feature]);

  const handleSave = async () => {
    if (!id) {
      toast.error(t("invalidFeatureId") || "Invalid feature ID");
      return;
    }
    setLoading(true);
    try {
      await editFeature(Number(id), {
        description: {
          ar: arDescription,
          en: enDescription,
        },
        is_active: isActive,
      });
      toast.success(t("featuedUpdated"));
      navigate("/settings");
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        t("somethingWentWrong");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
      <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل المميزات"
          titleEn="Edit features"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            { titleAr: "تعديل المميزات", titleEn: "Edit features" },
          ]}
        />
      </div>
      <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
        <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t("image")}</h3>
        <ImageInput
          image={profileImage}
          setImage={setProfileImage}
          // placeholderText={t("addGIF")}
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
          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditFeatures;
