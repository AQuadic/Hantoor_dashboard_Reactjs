import CarsHeader from "@/components/cars/CarsHeader";
import CarsTable from "@/components/cars/CarsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React, { useState } from "react";
import { type VehiclesApiResponse, type VehicleFilters } from "@/api/vehicles";

const CarsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehiclesData, setVehiclesData] = useState<VehiclesApiResponse | null>(
    null
  );

  // Filter states
  const [filters, setFilters] = useState<VehicleFilters>({
    country_id: undefined,
    brand_id: [],
    vehicle_type_id: [],
    vehicle_model_id: [],
    agent_id: [],
    seats: [],
    vehicle_body_type_id: [],
    vehicle_class_id: [],
    engine_volume_id: undefined,
    is_offer: undefined,
    is_discount: undefined,
    price_from: undefined,
    price_to: undefined,
    price_range: undefined,
    sort_by: undefined,
    sort_order: undefined,
    order_by: undefined,
    is_active: undefined,
    search_type: undefined,
  });

  const handleDataChange = (data: VehiclesApiResponse) => {
    setVehiclesData(data);
  };

  const handleFilterChange = (newFilters: Partial<VehicleFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div>
      <CarsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="px-2 md:px-8">
        <CarsTable
          currentPage={currentPage}
          searchTerm={searchTerm}
          filters={filters}
          onDataChange={handleDataChange}
        />
        {vehiclesData?.data && vehiclesData.data.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={vehiclesData?.last_page || 1}
            totalItems={vehiclesData?.total || 0}
            itemsPerPage={vehiclesData?.per_page || 10}
            from={vehiclesData?.from || 0}
            to={vehiclesData?.to || 0}
          />
        )}
      </div>
    </div>
  );
};

export default CarsPage;
