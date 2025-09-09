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

  // Convert additionalImages (VehicleImage[]) to File[] for MultiImageInput
  // Only include File objects for the MultiImageInput component
  const convertedImages = useMemo(() => {
    if (!formData?.additionalImages) return null;
    const files = formData.additionalImages
      .map((img) => img.image)
      .filter((img): img is File => img instanceof File);
    return files.length > 0 ? files : null;
  }, [formData?.additionalImages]);

  // Get existing image URLs for display
  const existingImageUrls = useMemo(() => {
    if (!formData?.additionalImages) return [];
    return formData.additionalImages
      .map((img) => img.image)
      .filter((img): img is string => typeof img === "string");
  }, [formData?.additionalImages]);

  // Check if main image is a string URL or File
  const mainImageFile =
    formData?.mainImage instanceof File ? formData.mainImage : null;
  const mainImageUrl =
    typeof formData?.mainImage === "string" ? formData.mainImage : undefined;

  // Check if video is a string URL or File
  const videoFile =
    formData?.videoFile instanceof File ? formData.videoFile : null;
  const videoUrl =
    typeof formData?.videoFile === "string" ? formData.videoFile : undefined;

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
            image={mainImageFile}
            setImage={(value) => {
              const newImage =
                typeof value === "function" ? value(mainImageFile) : value;
              updateField?.("mainImage", newImage);
            }}
            existingImageUrl={mainImageUrl}
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
                  updateField?.("additionalImages", vehicleImages);
                } else {
                  updateField?.("additionalImages", []);
                }
              }}
              height={110}
            />
            <VideoInput
              video={videoFile}
              setVideo={(value) => {
                const newVideo =
                  typeof value === "function" ? value(videoFile) : value;
                updateField?.("videoFile", newVideo);
              }}
              existingVideoUrl={videoUrl}
              height={110}
            />
          </div>
        </div>
      </div>
      {((convertedImages && convertedImages.length > 0) ||
        existingImageUrls.length > 0) && (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
          <h1 className="text-lg text-primary font-bold mb-2">
            الصور الاضافية
          </h1>
          {/* Image Gallery */}
          <div className="mt-6 flex flex-wrap gap-4">
            {/* Show existing images from URLs */}
            {existingImageUrls.map((imageUrl, index) => (
              <div
                key={`existing-image-${index}-${imageUrl.slice(-10)}`}
                className={`bg-white rounded-lg
                relative overflow-hidden border border-gray-200 w-[210px]
           h-[160px]`}
              >
                <img
                  src={imageUrl}
                  alt={`Vehicle view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Remove the existing image from the additionalImages array
                    const updatedImages =
                      formData?.additionalImages?.filter(
                        (img) => img.image !== imageUrl
                      ) || [];
                    updateField?.("additionalImages", updatedImages);
                  }}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
                  aria-label="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {/* Show new uploaded images */}
            {imagePreviews.map((preview, index) => (
              <div
                key={`additional-preview-${index}-${preview.slice(-10)}`}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    // Remove the File image - need to find its index in the additionalImages array
                    const fileImages =
                      formData?.additionalImages?.filter(
                        (img) => img.image instanceof File
                      ) || [];
                    if (index < fileImages.length) {
                      const imageToRemove = fileImages[index];
                      const updatedImages =
                        formData?.additionalImages?.filter(
                          (img) => img !== imageToRemove
                        ) || [];
                      updateField?.("additionalImages", updatedImages);
                    }
                  }}
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
