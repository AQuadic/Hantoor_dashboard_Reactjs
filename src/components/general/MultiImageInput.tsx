import { X } from "lucide-react";
import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface ImageInputProps {
  width?: number;
  height?: number;
  images: File[] | null;
  setImages: React.Dispatch<React.SetStateAction<File[] | null>>;
  isRounded?: boolean;
  maxImages?: number;
}

const MultiImageInput: React.FC<ImageInputProps> = ({
  width,
  height,
  images,
  setImages,
  isRounded = false,
  maxImages = 10,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create previews when images change
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

  // Handle file selection
  const handleFileSelect = (newFiles: FileList) => {
    const validFiles: File[] = [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      const currentImages = images || [];
      const totalImages = currentImages.length + validFiles.length;

      if (totalImages <= maxImages) {
        setImages([...currentImages, ...validFiles]);
      } else {
        // Take only the files that fit within the limit
        const remainingSlots = maxImages - currentImages.length;
        const filesToAdd = validFiles.slice(0, remainingSlots);
        setImages([...currentImages, ...filesToAdd]);
      }
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Handle click to open file dialog
  const handleClick = () => {
    const currentImageCount = images?.length || 0;
    if (currentImageCount < maxImages) {
      fileInputRef.current?.click();
    }
  };

  // Handle remove single image
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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentImageCount = images?.length || 0;
  const hasImages = currentImageCount > 0;

  return (
    <div className="w-full">
      <div
        className={`bg-white ${
          isRounded ? "rounded-full" : "rounded-lg"
        } flex flex-col gap-5 items-center justify-center border-dashed border-2 cursor-pointer relative overflow-hidden ${
          width ? `w-[${width}px]` : "w-[180px]"
        } ${height ? `h-[${height}px]` : "h-[180px]"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Content - Same as original design */}
        <img
          src="/images/addImage.png"
          alt="Add Image"
          className="w-[50px] h-[50px]"
        />
        <p className="text-lg text-primary underline">اضافة صورة</p>
      </div>

      {/* Image Gallery */}
      {hasImages && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className={`bg-white ${
                isRounded ? "rounded-full" : "rounded-lg"
              } relative overflow-hidden border border-gray-200 ${
                width ? `w-[${width}px]` : "w-[180px]"
              } ${height ? `h-[${height}px]` : "h-[180px]"}`}
            >
              {/* Remove button */}
              <button
                onClick={(e) => handleRemoveImage(index, e)}
                className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <img
                src={preview}
                alt={`Uploaded preview ${index + 1}`}
                className={`w-full h-full object-cover ${
                  isRounded ? "rounded-full" : "rounded-lg"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiImageInput;
