import CarsHeader from "@/components/cars/CarsHeader";
import CarsTable from "@/components/cars/CarsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React, { useState } from "react";
import { type VehiclesApiResponse } from "@/api/vehicles";

const CarsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehiclesData, setVehiclesData] = useState<VehiclesApiResponse | null>(
    null
  );

  const handleDataChange = (data: VehiclesApiResponse) => {
    setVehiclesData(data);
  };

  return (
    <div>
      <CarsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="px-2 md:px-8">
        <CarsTable
          currentPage={currentPage}
          searchTerm={searchTerm}
          onDataChange={handleDataChange}
        />
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={vehiclesData?.last_page || 1}
          totalItems={vehiclesData?.total || 0}
          itemsPerPage={vehiclesData?.per_page || 10}
          from={vehiclesData?.from || 0}
          to={vehiclesData?.to || 0}
        />
      </div>
    </div>
  );
};

export default CarsPage;
