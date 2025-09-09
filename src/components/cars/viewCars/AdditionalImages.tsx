import NoData from "@/components/general/NoData";
import React from "react";

interface AdditionalImage {
  id: number;
  url: string;
  responsive_urls: string[];
}

const AdditionalImages = ({ images }: { images: AdditionalImage[] }) => {
  if (!images || images.length === 0) {
    return (
      <NoData />
    );
  }

  return (
    <div className="p-8 flex gap-4 flex-wrap justify-center">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt={`Additional Image ${img.id}`}
          className="w-[211px] h-[163px] object-cover rounded-lg shadow"
        />
      ))}
    </div>
);
}

export default AdditionalImages;
