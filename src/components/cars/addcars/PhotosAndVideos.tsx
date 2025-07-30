import ImageInput from "@/components/general/ImageInput";
import React, { useEffect, useState } from "react";
import VideoInput from "@/components/general/VideoInput";
import MultiImageInput from "@/components/general/MultiImageInput";
import { Trash2 } from "lucide-react";

const PhotosAndVideos = () => {
  const [mainImage, setMainImage] = React.useState<File | null>(null);
  const [images, setImages] = React.useState<File[] | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [video, setVideo] = React.useState<File | null>(null);

  const handleRemoveImage = (indexToRemove: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (images) {
      const updatedImages = images.filter(
        (_, index) => index !== indexToRemove,
      );
      setImages(updatedImages.length > 0 ? updatedImages : null);
    }
  };

  useEffect(() => {
    if (images && images.length > 0) {
      const previews: string[] = [];
      let loadedCount = 0;

      images.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews[index] = e.target?.result as string;
          loadedCount++;
          if (loadedCount === images.length) {
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }
  }, [images]);

  return (
    <section>
      <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
        <h1 className="text-lg text-primary font-bold mb-2">
          الصور والفيديوهات
        </h1>
        <div className="flex md:flex-row flex-col gap-4">
          <ImageInput
            image={mainImage}
            setImage={setMainImage}
            width={555}
            height={231}
          />
          <div className="flex md:flex-col flex-row gap-[11px]">
            <MultiImageInput
              images={images}
              setImages={setImages}
              height={110}
            />
            <VideoInput video={video} setVideo={setVideo} height={110} />
          </div>
        </div>
      </div>
      {images?.length && (
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
                {/* Image */}
                <img
                  src={preview}
                  alt={`Uploaded preview ${index + 1}`}
                  className={`w-full h-full object-cover ${"rounded-lg"}`}
                />

                {/* Remove button - always visible in center */}
                <button
                  onClick={(e) => handleRemoveImage(index, e)}
                  className="absolute inset-0 m-auto bg-black/70 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors duration-200 z-10 hover:bg-black/90"
                  aria-label="Remove image"
                >
                  <Trash2 size={20} />
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
