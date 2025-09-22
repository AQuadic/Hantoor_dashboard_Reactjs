import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVehicleById, Vehicle } from "@/api/vehicles/getVehicleById";
import ViewCarsHeader from "@/components/cars/viewCars/ViewCarsHeader";
import React from "react";
import AboutCar from "@/components/cars/viewCars/AboutCar";
import Specifications from "@/components/cars/viewCars/Specifications";
import MaintenancePackages from "@/components/cars/viewCars/MaintenancePackages";
import Accessories from "@/components/cars/viewCars/Accessories";
import Offers from "@/components/cars/viewCars/Offers";
import LeaseToOwn from "@/components/cars/viewCars/LeaseToOwn";
import AdditionalImages from "@/components/cars/viewCars/AdditionalImages";
import Videos from "@/components/cars/viewCars/Videos";
import AdImages from "@/components/cars/viewCars/AdImages";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/general/Loading";
const DEFAULT_FILTER = "About Car";

const ViewCars = () => {
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);
  const params = useParams<{ id: string }>();
  const vehicleId = params.id ? Number(params.id) : null;


  const { data: vehicle, isLoading, refetch } = useQuery<Vehicle>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      const result = await getVehicleById(vehicleId!);
      return result;
    },
    enabled: vehicleId !== null,
  });

  if (isLoading) return <Loading />

  return (
    <div>
      <ViewCarsHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        vehicle={vehicle}
      />
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedFilter === "About Car" && vehicle && <AboutCar vehicle={vehicle} />}
            {selectedFilter === "Specifications" && vehicle && (
              <Specifications vehicle={vehicle} />
            )}
            {selectedFilter === "Maintenance Packages" && (
              <MaintenancePackages packages={vehicle?.packages || []} refetch={refetch} />
            )}
            {selectedFilter === "Accessories" && (
              <Accessories accessories={vehicle?.accessories || []} refetch={refetch}/>
            )}
            {selectedFilter === "Offers" && (
              <Offers offers={vehicle?.offers || []} />
            )}
            {selectedFilter === "Lease to Own" && (
              <LeaseToOwn vehicle={vehicle} />
            )}
            {selectedFilter === "Additional Images" && (
              <AdditionalImages images={vehicle?.additional_images || []} />
            )}
            {selectedFilter === "Videos" && <Videos video={vehicle?.video || null} />}
            {selectedFilter === "Ad Images" && vehicle?.images_ads && (
              <AdImages imagesAds={vehicle.images_ads} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewCars;
