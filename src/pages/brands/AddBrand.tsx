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
  const { t, i18n } = useTranslation("brands");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  // wrapper so uploading a new image clears the remove flag
  const handleSetImage = (file: React.SetStateAction<File | null>): void => {
    // Support functional updater or direct value to match setState signature
    if (typeof file === "function") {
      const updater = file as (prev: File | null) => File | null;
      setProfileImage((prev) => {
        const next = updater(prev);
        if (next) setRemoveImage(false);
        return next;
      });
    } else {
      setProfileImage(file);
      if (file) setRemoveImage(false);
    }
  };
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
      // Build payloads conditionally: only include `image` when a File is present
      if (isEdit && brandId) {
        const payload: any = {
          id: Number(brandId),
          name: { ar: arBrand, en: enBrand },
        };
        if (profileImage instanceof File) payload.image = profileImage;
        if (removeImage) payload.remove_image = true;
        return (await updateBrand(payload)) as BrandResponse;
      } else {
        const payload: any = {
          name: { ar: arBrand, en: enBrand },
        };
        if (profileImage instanceof File) payload.image = profileImage;
        if (removeImage) payload.remove_image = true;
        return (await postBrand(payload)) as BrandResponse;
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
    if (!arBrand.trim()) {
        toast.error(i18n.language === "ar" ? "يرجى إدخال الاسم العربي للماركة" : "Please enter Arabic brand name");
        return;
      }
      if (!enBrand.trim()) {
        toast.error(i18n.language === "ar" ? "يرجى إدخال الاسم الإنجليزي للماركة" : "Please enter English brand name");
        return;
      }
      if (!profileImage && !existingImageUrl) {
        toast.error(i18n.language === "ar" ? "يرجى رفع صورة للماركة" : "Please upload a brand image");
        return;
      }

    // If editing and the user removed the existing image without uploading a replacement,
    // block submission and show an error toast instead of sending the request.
    if (isEdit && removeImage && !profileImage) {
      toast.error(
        i18n.language === "ar"
          ? "لقد قمت بحذف الصورة، يرجى رفع صورة جديدة قبل الحفظ."
          : "You removed the image — please upload a new image before saving."
      );
      return;
    }
    mutation.mutate();
  };

  // Show loading state while fetching brand data for edit
  if (isEdit && isBrandLoading) {
    return <div>Loading brand data...</div>;
  }

  // In edit mode we disallow removing the existing image; parent will pass canRemove

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
              setImage={handleSetImage}
              existingImageUrl={existingImageUrl}
              // Allow removing the image in both add and edit modes
              canRemove={true}
              onRemoveImage={() => {
                // clear both preview and existing URL when user removes image
                setProfileImage(null);
                setExistingImageUrl(undefined);
                setRemoveImage(true);
              }}
            />
            {/* ImageInput handles removal itself; no extra remove button here */}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold ">{t("mainData")}</h3>
          <div className="flex md:flex-row flex-col gap-4">
            <DashboardInput
              label={t("arBrand")}
              value={arBrand}
              onChange={setArBrand}
              placeholder={t("writeHere")}
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
