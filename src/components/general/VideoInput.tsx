import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface VideoInputProps {
  width?: number;
  height?: number;
  video: File | null;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
  isRounded?: boolean;
  existingVideoUrl?: string;
  onRemoveVideo?: (e?: React.MouseEvent) => void;
}

const VideoInput: React.FC<VideoInputProps> = ({
  width,
  height,
  video,
  setVideo,
  isRounded = false,
  existingVideoUrl,
}) => {
  const { t } = useTranslation("setting");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Create preview when video changes
  useEffect(() => {
    if (video) {
      const url = URL.createObjectURL(video);
      setVideoPreview(url);
      setIsLoaded(false);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (existingVideoUrl) {
      setVideoPreview(existingVideoUrl);
      setIsLoaded(false);
    } else {
      setVideoPreview(null);
      setIsPlaying(false);
      setIsLoaded(false);
    }
  }, [video, existingVideoUrl]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
    } else {
      alert("Please select a valid video file");
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
    if (!video) {
      fileInputRef.current?.click();
    }
  };

  // Handle remove video
  const handleRemoveVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle video click to play/pause
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current || !isLoaded) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Video playback failed:", error);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute
  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newMutedState = !videoRef.current.muted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // Handle video events
  const handleVideoLoadedData = () => {
    setIsLoaded(true);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleVideoClick(e);
  };

  return (
    <div
      className={`bg-white ${isRounded ? "rounded-full" : "rounded-lg"} 
                  flex flex-col gap-5 items-center justify-center 
                  border-dashed border-2 cursor-pointer relative overflow-hidden`}
      style={{ width: width ?? 180, height: height ?? 180 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !video) {
          handleClick();
        }
      }}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Remove button - only show when video is present */}
      {video && (
        <button
          onClick={handleRemoveVideo}
          className="absolute top-2 right-2 bg-black text-white rounded-full p-1 transition-colors duration-200 z-20 hover:bg-gray-800"
          aria-label="Remove video"
        >
          <X size={16} />
        </button>
      )}

      {/* Content */}
      {(video || existingVideoUrl) && videoPreview ? (
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <video
            ref={videoRef}
            src={videoPreview}
            className={`w-full h-full object-cover ${
              isRounded ? "rounded-full" : "rounded-lg"
            }`}
            muted={isMuted}
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoadedData}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
          />

          {/* Play/Pause and Mute Controls - visible on hover or when paused */}
          {isLoaded && (isHovering || !isPlaying) && (
            <>
              {/* Play/Pause overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer z-10"
                onClick={handleOverlayClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleVideoClick(e as unknown as React.MouseEvent);
                  }
                }}
                style={{
                  transition: "opacity 0.3s ease",
                }}
              >
                <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg">
                  {isPlaying ? (
                    <Pause size={32} className="text-black" />
                  ) : (
                    <Play size={32} className="text-black ml-1" />
                  )}
                </div>
              </div>

              {/* Mute/Unmute button */}
              <button
                onClick={handleMuteToggle}
                className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-full p-2 shadow-lg transition-colors duration-200 z-20 hover:bg-opacity-100"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-black" />
                ) : (
                  <Volume2 size={20} className="text-black" />
                )}
              </button>
            </>
          )}

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-sm">Loading...</div>
            </div>
          )}
        </div>
      ) : (
        <div className={"flex flex-col items-center justify-center"}>
          <img
            src="/images/addVideo.svg"
            alt="Add Video"
            className="w-[36px] h-[36px]"
          />
          <p className="text-lg text-primary underline">{t("addVideo")}</p>
        </div>
      )}
    </div>
  );
};

export default VideoInput;
