import MultiImageInput from "@/components/general/MultiImageInput";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarAdvertisingImages = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();
  const [, setPreviewVersion] = useState(0);
  const filePreviewMapRef = useRef<Map<File, string>>(new Map());

  const handleRemoveImage = (indexToRemove: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const updatedImages =
      formData?.adsImages?.filter((_, index) => index !== indexToRemove) || [];
    updateField?.("adsImages", updatedImages);
  };

  // Convert adsImages (VehicleImage[]) to File[] for MultiImageInput
  const convertedImages = useMemo(() => {
    if (!formData?.adsImages) return null;
    const files = formData.adsImages
      .map((img) => img.image)
      .filter((img): img is File => img instanceof File);
    return files.length > 0 ? files : null;
  }, [formData?.adsImages]);

  // Create previews for File objects and build a previews array that matches formData.adsImages order.
  useEffect(() => {
    const ads = formData?.adsImages || [];
    const map = filePreviewMapRef.current;

    // If there are no adsImages, nothing to do
    if (!ads || ads.length === 0) return;

    let fileCount = 0;
    ads.forEach((a) => {
      if (a && a.image instanceof File) fileCount++;
    });

    // If there are no File objects, no need to read files; just trigger a render
    if (fileCount === 0) {
      setPreviewVersion((v) => v + 1);
      return;
    }

    // There are files to read - build previews in order
    const previews: string[] = new Array(ads.length).fill("");
    let loaded = 0;

    ads.forEach((a, index) => {
      const img = a?.image;
      if (img instanceof File) {
        if (map.has(img)) {
          previews[index] = map.get(img)!;
          loaded++;
          if (loaded === fileCount) {
            // merge with any string URLs in ads and trigger re-render
            setPreviewVersion((v) => v + 1);
          }
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          map.set(img, result);
          previews[index] = result;
          loaded++;
          if (loaded === fileCount) setPreviewVersion((v) => v + 1);
        };
        reader.readAsDataURL(img);
      } else {
        // non-file, will be handled when merging
      }
    });
  }, [formData?.adsImages]);

  return (
    <section>
      <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
        <h1 className="text-lg text-[#2A32F8] font-bold mb-4">
          {t("advertisingImages") || "صور الإعلانات"}
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
                updateField?.("adsImages", vehicleImages);
              } else {
                updateField?.("adsImages", []);
              }
            }}
            height={169}
          />
        </div>
      </div>
      {formData?.adsImages && formData.adsImages.length > 0 && (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
          <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
            {t("advertisingImagesPreview") || "معاينة صور الإعلانات"}
          </h1>
          {/* Image Gallery for both URL and File images */}
          <div className="mt-6 flex flex-wrap gap-4">
            {(formData?.adsImages || []).map((imgObj, index) => {
              const isFile = imgObj && imgObj.image instanceof File;
              let src = "";
              if (isFile) {
                src = filePreviewMapRef.current.get(imgObj.image as File) || "";
              } else if (imgObj && imgObj.image) {
                // handle string URL or object containing url
                if (typeof imgObj.image === "string") src = imgObj.image;
                else if (
                  typeof imgObj.image === "object" &&
                  imgObj.image !== null &&
                  "url" in imgObj.image
                ) {
                  // @ts-ignore
                  src = imgObj.image.url || "";
                } else src = String(imgObj.image);
              }

              if (!src) return null;

              return (
                <div
                  key={`ads-image-${index}-${src.slice(-10)}`}
                  className={`bg-white rounded-lg relative overflow-hidden border border-gray-200 w-[210px] h-[160px]`}
                >
                  <img
                    src={src}
                    alt={`Advertising Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => handleRemoveImage(index, e)}
                    className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
                    aria-label="Remove advertising image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CarAdvertisingImages;
