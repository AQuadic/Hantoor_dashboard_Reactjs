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
  // image may be a File when user picked a file, or a string URL when
  // the parent provides an existing image from the API. Keep setImage
  // typed to File | null to remain compatible with existing callers.
  image: File | string | null | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isRounded?: boolean;
  placeholderText?: string;
  existingImageUrl?: string;
  onRemoveImage?: (e?: React.MouseEvent) => void;
  canRemove?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  width,
  height,
  image,
  setImage,
  isRounded = false,
  placeholderText,
  existingImageUrl,
  onRemoveImage,
  canRemove = true,
}) => {
  const { t } = useTranslation("setting");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine if we should show icon-only mode
  const isIconMode = (width ?? 180) < 150;

  // Create preview when image changes
  useEffect(() => {
    // If parent passed a File instance, use FileReader to create a data URL.
    // If parent passed a string (URL), use it directly as the preview.
    let cancelled = false;
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!cancelled) setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(image);
      return () => {
        cancelled = true;
      };
    }

    if (typeof image === "string" && image) {
      setImagePreview(image);
    } else if (existingImageUrl) {
      setImagePreview(existingImageUrl);
    } else {
      setImagePreview(null);
    }
  }, [image, existingImageUrl]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file?.type?.startsWith("image/")) {
      setImage(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
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
    // Prevent the click from bubbling to the container which opens the file dialog
    e.stopPropagation();

    if (onRemoveImage) {
      // Call parent callback without forwarding the raw event so parent
      // handlers that don't accept an event won't be affected.
      // Parent is responsible for clearing any existingImageUrl state.
      onRemoveImage();
    } else {
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    // Note: existingImageUrl is controlled by parent, so it will persist unless parent clears it
  };

  return (
    <button
      type="button"
      aria-label="Upload image"
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
      {(image || (existingImageUrl && imagePreview)) && canRemove && (
        <button
          type="button"
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
            alt="add"
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
    </button>
  );
};

export default ImageInput;
