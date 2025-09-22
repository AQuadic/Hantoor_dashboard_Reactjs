import { VehicleVideo } from "@/api/vehicles/getVehicleById";
import React from "react";
import NoData from "@/components/general/NoData";

interface VideosProps {
  video?: VehicleVideo | null;
}

const Videos: React.FC<VideosProps> = ({ video }) => {
  if (!video || !video.url) {
    return <NoData />;
  }

    return (
        <section className="mt-4 flex flex-wrap gap-4 md:mx-8 mx-0">
            {video?.url ? (
                <video
                src={video.url}
                controls
                className="w-full md:w-1/2 lg:w-1/3 rounded-lg"
                >
                Your browser does not support the video tag.
                </video>
            ) : (
                <img
                src="/images/carVideo.png"
                alt="Video placeholder"
                className="w-full md:w-1/2 lg:w-1/3 rounded-lg"
                />
            )}
        </section>
    )
}

export default Videos
