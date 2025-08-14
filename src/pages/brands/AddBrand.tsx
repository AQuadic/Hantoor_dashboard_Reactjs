// Type definitions
type BrandData = {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  image?: string;
};

type BrandResponse = {
  success?: boolean;
  message?: string;
};

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import ImageInput from "@/components/general/ImageInput";
import React, { useState, useEffect } from "react";
import { postBrand } from "@/api/brand/postBrand";
import { fetchBrandById, updateBrand } from "@/api/brand/updateBrand";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddBrand = () => {
  const { t } = useTranslation("brands");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [arBrand, setArBrand] = useState("");
  const [enBrand, setEnBrand] = useState("");
  const [isActive, setIsActive] = useState(true); // default active
  const params = useParams();
  const brandId = params.id;
  const navigate = useNavigate();

  const isEdit = Boolean(brandId);

  const [loading, setLoading] = useState(false);

  // React Query: fetch brand data if editing
  const { data: brandData, isLoading: isBrandLoading } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: async (): Promise<BrandData | undefined> => {
      if (isEdit && brandId) {
        const data = await fetchBrandById(Number(brandId));
        return data as BrandData;
      }
      return undefined;
    },
    enabled: isEdit,
  });

  // Update form fields when brand data is loaded
  useEffect(() => {
    if (brandData && isEdit) {
      setArBrand(brandData.name?.ar || "");
      setEnBrand(brandData.name?.en || "");
      setIsActive(brandData.is_active ?? true);
      // Note: You might need to handle the existing image display separately
      // since profileImage expects a File object, not a URL string
    }
  }, [brandData, isEdit]);

  // React Query: mutation for add/edit
  const mutation = useMutation<BrandResponse, Error, void>({
    mutationFn: async () => {
      if (isEdit && brandId) {
        return (await updateBrand({
          id: Number(brandId),
          name: { ar: arBrand, en: enBrand },
          image: profileImage,
          is_active: isActive,
        })) as BrandResponse;
      } else {
        return (await postBrand({
          name: { ar: arBrand, en: enBrand },
          image: profileImage,
        })) as BrandResponse;
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      if (
        response &&
        (response.success === undefined || response.success === true)
      ) {
        toast.success(
          response.message ||
            (isEdit
              ? t('brandUpdatedSucccessfully')
              : t('brandAddedSucccessfully'))
        );

        navigate("/brands");

        // Only navigate back when editing is done, not when adding
        if (isEdit) {
          // Optional: Add a small delay to show the success message
          setTimeout(() => {
            navigate("/brands");
          }, 1500);
        } else {
          // For adding, you might want to reset the form instead
          setArBrand("");
          setEnBrand("");
          setProfileImage(null);
          setIsActive(true);
        }
      } else {
        toast.error(
          response.message ||
            (isEdit ? "Failed to update brand." : "Failed to add brand.")
        );
      }
    },
      onError: (err: any) => {
        const errorMsg =
          err?.response?.data?.message || err?.message || "حدث خطأ ما";
        toast.error(errorMsg);
      },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  // Show loading state while fetching brand data for edit
  if (isEdit && isBrandLoading) {
    return <div>Loading brand data...</div>;
  }

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
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">
            {t("brandImage")}
          </h3>
          <ImageInput
            image={profileImage}
            setImage={setProfileImage}
            // If you have an existing image URL, you might need to pass it here
            // existingImageUrl={brandData?.image}
          />
        </div>
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold ">{t("mainData")}</h3>
          <div className="flex md:flex-row flex-col gap-4">
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
          {/* Optionally add is_active toggle for edit */}
          {isEdit && (
            <div className="flex items-center gap-2 mt-2">
              <label>{t("isActive") || "Active"}</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>
          )}
          <DashboardButton
            titleAr={isEdit ? "تعديل" : " اضافة"}
            titleEn={isEdit ? "Edit" : "Add"}
            onClick={handleSubmit}
            isLoading={loading || isBrandLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
