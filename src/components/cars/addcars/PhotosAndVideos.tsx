import ImageInput from "@/components/general/ImageInput";
import React, { useEffect, useState, useMemo } from "react";
import VideoInput from "@/components/general/VideoInput";
import MultiImageInput from "@/components/general/MultiImageInput";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const PhotosAndVideos = () => {
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
    return (
      (formData?.carImages
        ?.map((img) => img.image)
        .filter((img) => img instanceof File) as File[]) || null
    );
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
          {t("photosAndVideos")}
        </h1>
        <div className="flex md:flex-row flex-col gap-4">
          <ImageInput
            image={formData?.mainImage as File | null}
            setImage={(value) => {
              const newImage =
                typeof value === "function"
                  ? value(formData?.mainImage as File | null)
                  : value;
              updateField?.("mainImage", newImage);
            }}
            width={555}
            height={231}
          />
          <div className="flex md:flex-col flex-row gap-[11px]">
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
              height={110}
            />
            <VideoInput
              video={formData?.videoFile as File | null}
              setVideo={(value) => {
                const newVideo =
                  typeof value === "function"
                    ? value(formData?.videoFile as File | null)
                    : value;
                updateField?.("videoFile", newVideo);
              }}
              height={110}
            />
          </div>
        </div>
      </div>
      {convertedImages && convertedImages.length > 0 && (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
          <h1 className="text-lg text-primary font-bold mb-2">
            الصور الاضافية
          </h1>
          {/* Image Gallery */}
          <div className="mt-6 flex flex-wrap gap-4">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg
                relative overflow-hidden border border-gray-200 w-[210px]
           h-[160px]`}
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => handleRemoveImage(index, e)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
                  aria-label="Remove image"
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

export default PhotosAndVideos;
