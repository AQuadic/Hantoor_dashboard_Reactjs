import TablePagination from "@/components/general/dashboard/table/TablePagination";
import TermsHeader from "@/components/termsandconditions/TermsHeader";
import TermsTable from "@/components/termsandconditions/TermsTable";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="md:px-8 px-2">
      <TermsHeader />
      <TermsTable />
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
  );
};

export default TermsAndConditions;
