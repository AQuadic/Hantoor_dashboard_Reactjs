import ImageInput from "@/components/general/ImageInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarAdvertisingImages = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();

  // Get the first ads image as the advertising image
  const advertisingImage = formData?.adsImages?.[0]?.image || null;

  const handleImageChange = (
    value: File | null | ((prev: File | null) => File | null)
  ) => {
    const newImage =
      typeof value === "function"
        ? value(advertisingImage as File | null)
        : value;

    if (newImage) {
      // Update or add the first ads image
      const newAdsImages = [...(formData?.adsImages || [])];
      newAdsImages[0] = { image: newImage };
      updateField?.("adsImages", newAdsImages);
    } else {
      // Remove the first ads image
      const newAdsImages = formData?.adsImages?.slice(1) || [];
      updateField?.("adsImages", newAdsImages);
    }
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-4">
        {t("advertisingImages")}
      </h1>
      <ImageInput
        image={advertisingImage as File | null}
        setImage={handleImageChange}
        width={378}
        height={169}
      />
    </div>
  );
};

export default CarAdvertisingImages;
