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
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isRounded?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  width,
  height,
  image,
  setImage,
  isRounded = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create preview when image changes
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

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
  };

  return (
    <>
 <div
  className={`bg-white ${isRounded ? "rounded-full" : "rounded-lg"} 
              flex flex-col gap-5 items-center justify-center 
              border-dashed border-2 cursor-pointer relative overflow-hidden`}
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

        {/* Remove button - only show when image is present */}
        {image && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-10 hover:bg-gray-800"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        )}

        {/* Content */}
        {image && imagePreview ? (
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
              className="w-[50px] h-[50px]"
            />
            <p className="text-lg text-primary underline">اضافة صورة</p>
          </>
        )}
      </div>
    </>
  );
};

export default ImageInput;
