import FinancingHeader from "@/components/financing/FinancingHeader";
import FinancingTable from "@/components/financing/FinancingTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getFinancingCountries } from "@/api/financing/getFinancingWithBanks";

const FinancingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: financingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["financing", currentPage, searchTerm],
    queryFn: () => getFinancingCountries(currentPage, searchTerm),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <FinancingHeader onSearch={handleSearch} />
      <div className="px-2 md:px-8">
        <FinancingTable
          data={financingData?.data || []}
          isLoading={isLoading}
          error={error}
        />
        {financingData && (
          <TablePagination
            currentPage={financingData.meta.current_page}
            setCurrentPage={handlePageChange}
            totalPages={financingData.meta.last_page || 1}
            totalItems={financingData.meta.total || 0}
            itemsPerPage={financingData.meta.per_page}
            from={financingData.meta.from}
            to={financingData.meta.to}
          />
        )}
      </div>
    </div>
  );
};

export default FinancingPage;
