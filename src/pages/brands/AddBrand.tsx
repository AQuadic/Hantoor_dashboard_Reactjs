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
import { deleteBrandImage } from "@/api/brand/deleteBrandImage";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddBrand = () => {
  const { t, i18n } = useTranslation("brands");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [arBrand, setArBrand] = useState("");
  const [enBrand, setEnBrand] = useState("");
  // Removed isActive state
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );
  const params = useParams();
  const brandId = params.id;
  const navigate = useNavigate();

  const isEdit = Boolean(brandId);

  const [loading, setLoading] = useState(false);

  // React Query: fetch brand data if editing
  const { data: brandData, isLoading: isBrandLoading } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: async (): Promise<any | undefined> => {
      if (isEdit && brandId) {
        const data = await fetchBrandById(Number(brandId));
        return data;
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
      // Removed isActive update
      // Set existing image URL for edit mode
      if (
        brandData.media &&
        Array.isArray(brandData.media) &&
        brandData.media.length > 0
      ) {
        setExistingImageUrl(brandData.media[0].url);
      } else {
        setExistingImageUrl(undefined);
      }
      // profileImage remains null unless user uploads a new one
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
          // is_active removed
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
              ? t("brandUpdatedSucccessfully")
              : t("brandAddedSucccessfully"))
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
          // setIsActive removed
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
    // Validation: require Arabic name, English name, and image (for add)
    if (!arBrand.trim() || !enBrand.trim() || (!isEdit && !profileImage)) {
      toast.error(
        t(
          "brandFieldsRequired",
          i18n.language === "ar"
            ? "يرجى تعبئة جميع الحقول المطلوبة."
            : "Please fill all required fields."
        )
      );
      return;
    }
    mutation.mutate();
  };

  // Show loading state while fetching brand data for edit
  if (isEdit && isBrandLoading) {
    return <div>Loading brand data...</div>;
  }

  // Remove image handler for X icon (used by ImageInput)
  const handleRemoveImage = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // If editing and there is an existing image, send updateBrand with image: null
    if (isEdit && existingImageUrl && brandId) {
      try {
        await updateBrand({
          id: Number(brandId),
          name: { ar: arBrand, en: enBrand },
          image: null,
          // is_active removed
        });
        setProfileImage(null);
        setExistingImageUrl(undefined);
        toast.success(t("brandImageDeleted", "Image deleted successfully"));
      } catch {
        toast.error(t("brandImageDeleteFailed", "Failed to delete image"));
      }
    } else {
      setProfileImage(null);
      setExistingImageUrl(undefined);
    }
  };

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
          <div className="relative">
            <ImageInput
              image={profileImage}
              setImage={setProfileImage}
              existingImageUrl={existingImageUrl}
              // Override the X icon's remove handler for edit mode
              // @ts-ignore
              onRemoveImage={handleRemoveImage}
            />
            {/* No spinner overlay needed since we removed the delete logic */}
          </div>
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
          {/* isActive checkbox removed */}
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
