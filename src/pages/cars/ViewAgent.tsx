import ViewAgentHeader from "@/components/cars/viewCars/ViewAgentHeader";
import React from "react";

const ViewAgent = () => {
  const [selectedFilter, setSelectedFilter] = React.useState(
    "Maintenance Centers"
  );
  return (
    <div>
      <ViewAgentHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default ViewAgent;
