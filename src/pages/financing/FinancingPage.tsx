import FinancingHeader from "@/components/financing/FinancingHeader";
import FinancingTable from "@/components/financing/FinancingTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";

const FinancingPage = () => {
  return (
    <div>
      <FinancingHeader />
      <div className="px-2 md:px-8">
        <FinancingTable />
        <TablePagination
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={20}
          totalItems={20}
          itemsPerPage={5}
          from={1}
          to={5}
        />
      </div>
    </div>
  );
};

export default FinancingPage;
