import MultiImageInput from "@/components/general/MultiImageInput";
import React, { useState, useEffect, useMemo } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const AdditionalImages = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleRemoveImage = (indexToRemove: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const updatedImages =
      formData?.carImages?.filter((_, index) => index !== indexToRemove) || [];
    updateField?.("carImages", updatedImages);
  };

  // Convert carImages (VehicleImage[]) to File[] for MultiImageInput
  const convertedImages = useMemo(() => {
    if (!formData?.carImages) return null;
    const files = formData.carImages
      .map((img) => img.image)
      .filter((img): img is File => img instanceof File);
    return files.length > 0 ? files : null;
  }, [formData?.carImages]);

  useEffect(() => {
    if (convertedImages && convertedImages.length > 0) {
      const previews: string[] = [];
      let loadedCount = 0;

      convertedImages.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews[index] = e.target?.result as string;
          loadedCount++;
          if (loadedCount === convertedImages.length) {
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }
  }, [convertedImages]);

  return (
    <section>
      <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
        <h1 className="text-lg text-primary font-bold mb-2">
          {t("additionalImages") || "الصور الإضافية"}
        </h1>
        <div className="flex flex-col gap-4">
          <MultiImageInput
            images={convertedImages}
            setImages={(value) => {
              const newImages =
                typeof value === "function" ? value(convertedImages) : value;
              if (newImages) {
                const vehicleImages = newImages.map((img) => ({
                  image: img,
                }));
                updateField?.("carImages", vehicleImages);
              } else {
                updateField?.("carImages", []);
              }
            }}
            height={160}
          />
        </div>
      </div>
      {convertedImages && convertedImages.length > 0 && (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
          <h1 className="text-lg text-primary font-bold mb-2">
            {t("additionalImagesPreview") || "معاينة الصور الإضافية"}
          </h1>
          {/* Image Gallery */}
          <div className="mt-6 flex flex-wrap gap-4">
            {imagePreviews.map((preview, index) => (
              <div
                key={`additional-image-${index}-${preview.slice(-10)}`}
                className={`bg-white rounded-lg
                relative overflow-hidden border border-gray-200 w-[210px]
           h-[160px]`}
              >
                <img
                  src={preview}
                  alt={`Additional Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => handleRemoveImage(index, e)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
                  aria-label="Remove additional image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdditionalImages;
