import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import ImageInput from "@/components/general/ImageInput";
import React, { useState } from "react";
import { postBrand } from "@/api/brand/postBrand";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

const AddBrand = () => {
  const { t } = useTranslation("brands");
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [arBrand, setArBrand] = useState("");
  const [enBrand, setEnBrand] = useState("");
  const params = useParams();
  const brandId = params.id;
  const navigate = useNavigate();

  const isEdit = Boolean(brandId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await postBrand({
        name: { ar: arBrand, en: enBrand },
        image: profileImage,
      });
      // Accept any valid response, even if response.success is missing
      if (
        response &&
        (response.success === undefined || response.success === true)
      ) {
        setSuccess(response.message || "Brand added successfully.");
        navigate("/brands");
      } else {
        setError(response.message || "Failed to add brand.");
      }
    } catch (err) {
      setError((err as Error)?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // const oldValues = {
  //   image: "aaa",
  //   name: "car name",
  // };

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة"}
        titleEn={isEdit ? "Edit Brand" : "Add Brand"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة",
            titleEn: isEdit ? "Edit Brand" : "Add Brand",
            link: isEdit ? `/brands/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("brandImage")}
          </h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold ">{t("mainData")}</h3>
          <div className="flex gap-4">
            <DashboardInput
              label={t("arBrand")}
              value={arBrand}
              onChange={setArBrand}
              placeholder=" تويوتا"
            />
            <DashboardInput
              label={t("enBrand")}
              value={enBrand}
              onChange={setEnBrand}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton
            titleAr=" اضافة"
            titleEn="Add"
            onClick={handleSubmit}
            isLoading={loading}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
