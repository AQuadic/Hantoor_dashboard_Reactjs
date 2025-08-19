import CarsHeader from "@/components/cars/CarsHeader";
import CarsTable from "@/components/cars/CarsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";

const CarsPage = () => {
  return (
    <div>
      <CarsHeader />
      <div className="px-2 md:px-8">
        <CarsTable />
        <TablePagination
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={50}
          totalItems={50}
          itemsPerPage={10}
          from={1}
          to={10}
        />
      </div>
    </div>
  );
};

export default CarsPage;
