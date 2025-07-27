import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";

const BrandsPage = () => {
  const [curentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [totalItems, setTotalItems] = React.useState(100); // Example total items, replace with actual data
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(totalItems / itemsPerPage)
  );
  return (
    <section>
      <BrandsHeader />
      <div className="px-2 md:px-8">
        <BrandsTable />
        <TablePagination
          currentPage={curentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </section>
  );
};

export default BrandsPage;
