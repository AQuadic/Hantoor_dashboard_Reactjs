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

const DEFAULT_FILTER = "About Car";

const ViewCars = () => {
  const [selectedFilter, setSelectedFilter] = React.useState(DEFAULT_FILTER);
  return (
    <div>
      <ViewCarsHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
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
            {selectedFilter === "About Car" && <AboutCar />}
            {selectedFilter === "Specifications" && <Specifications />}
            {selectedFilter === "Maintenance Packages" && (
              <MaintenancePackages />
            )}
            {selectedFilter === "Accessories" && <Accessories />}
            {selectedFilter === "Offers" && <Offers />}
            {selectedFilter === "Lease to Own" && <LeaseToOwn />}
            {selectedFilter === "Additional Images" && <AdditionalImages />}
            {selectedFilter === "Videos" && <Videos />}
            {selectedFilter === "Ad Images" && <AdImages />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewCars;
