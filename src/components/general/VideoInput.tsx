import { X } from "lucide-react";
import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface VideoInputProps {
  width?: number;
  height?: number;
  video: File | null;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
  isRounded?: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({
  width,
  height,
  video,
  setVideo,
  isRounded = false,
}) => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (video) {
      const previewURL = URL.createObjectURL(video);
      setVideoPreview(previewURL);
    } else {
      setVideoPreview(null);
    }

    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [video, videoPreview]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!video) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`bg-white ${isRounded ? "rounded-full" : "rounded-lg"} flex flex-col gap-4 items-center justify-center border-dashed border-2 cursor-pointer relative overflow-hidden ${
        width ? `w-[${width}px]` : "w-[300px]"
      } ${height ? `h-[${height}px]` : "h-[200px]"}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {video && (
        <button
          onClick={handleRemoveVideo}
          className="absolute top-2 right-2 bg-black text-white rounded-full p-1 z-10 hover:bg-gray-800"
          aria-label="Remove video"
        >
          <X size={16} />
        </button>
      )}

      {video && videoPreview ? (
        <video
          src={videoPreview}
          controls
          className={`w-full h-full object-cover ${
            isRounded ? "rounded-full" : "rounded-lg"
          }`}
        />
      ) : (
        <>
          <img
            src="/images/addVideo.svg"
            alt="Add Video"
            className="w-[50px] h-[50px]"
          />
          <p className="text-lg text-primary underline">اضافة فيديو</p>
        </>
      )}
    </div>
  );
};

export default VideoInput;
