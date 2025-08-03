import ViewCarsHeader from "@/components/cars/viewCars/ViewCarsHeader";
import React from "react";

const ViewCars = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("Models");
  return (
    <div>
      <ViewCarsHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default ViewCars;
