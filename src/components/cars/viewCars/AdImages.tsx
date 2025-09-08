import { Vehicle } from "@/api/vehicles/getVehicleById";
import NoData from "@/components/general/NoData";

interface AdImagesProps {
  imagesAds: Vehicle["images_ads"];
}

const AdImages = ({ imagesAds }: AdImagesProps) => {
  if (!imagesAds || imagesAds.length === 0) return <NoData />;

  return (
    <section className="mt-4 flex flex-wrap gap-4 md:mx-8 mx-0">
      {imagesAds.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt="Adimage"
          className="md:w-[502px] w-full md:h-[136px] h-full object-cover"
        />
      ))}
    </section>
  );
};

export default AdImages;
