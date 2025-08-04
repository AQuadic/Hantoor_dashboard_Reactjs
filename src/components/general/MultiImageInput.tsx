import { X } from "lucide-react";
import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface ImageInputProps {
  width?: number;
  height?: number;
  images: File[] | null;
  setImages: React.Dispatch<React.SetStateAction<File[] | null>>;
  isRounded?: boolean;
  maxImages?: number;
  title?: string;
}

const MultiImageInput: React.FC<ImageInputProps> = ({
  width,
  height,
  images,
  setImages,
  isRounded = false,
  maxImages = 10,
  title,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("cars");

  // Create previews when images change

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
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/addImage.png"
            alt="Add Image"
            className="w-[36px] h-[36px]"
          />
          <p className="text-lg text-primary underline">
            {title ? title : t('addPhotos')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiImageInput;
