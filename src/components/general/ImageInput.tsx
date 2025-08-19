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
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isRounded?: boolean;
  placeholderText?: string;
  existingImageUrl?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  width,
  height,
  image,
  setImage,
  isRounded = false,
  placeholderText,
  existingImageUrl,
}) => {
  const { t } = useTranslation("setting");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine if we should show icon-only mode
  const isIconMode = (width ?? 180) < 150;

  // Create preview when image changes
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(image);
    } else if (existingImageUrl) {
      setImagePreview(existingImageUrl);
    } else {
      setImagePreview(null);
    }
  }, [image, existingImageUrl]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
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
      handleFileSelect(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle click to open file dialog
  const handleClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    }
  };

  // Handle remove image
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Note: existingImageUrl is controlled by parent, so it will persist unless parent clears it
  };

  return (
    <>
      <div
        className={`bg-white ${isRounded ? "rounded-full" : "rounded-lg"} 
                    flex flex-col items-center justify-center 
                    border-dashed border-2 cursor-pointer relative overflow-hidden
                    ${isIconMode ? "gap-0" : "gap-5"}`}
        style={{ width: width ?? 180, height: height ?? 180 }}
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
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Remove button - show when image or existingImageUrl is present */}
        {(image || (existingImageUrl && imagePreview)) && (
          <button
            onClick={handleRemoveImage}
            className={`absolute ${
              isIconMode ? "top-1 right-1" : "top-2 right-2"
            } 
                       bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800`}
            aria-label="Remove image"
          >
            <X size={isIconMode ? 12 : 16} />
          </button>
        )}

        {/* Content */}
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded preview"
            className={`w-full h-full object-cover ${
              isRounded ? "rounded-full" : "rounded-lg"
            }`}
          />
        ) : (
          <>
            <img
              src="/images/addImage.png"
              alt="Add Image"
              className={isIconMode ? "w-[24px] h-[24px]" : "w-[50px] h-[50px]"}
            />
            {/* Only show text when not in icon mode */}
            {!isIconMode && (
              <p className="text-lg text-primary underline">
                {placeholderText || t("addPhoto")}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ImageInput;
