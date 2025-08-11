import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/models/brand/fetchBrands";

const BrandsPage = () => {
  const [curentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const [totalItems] = React.useState(100); // Example total items, replace with actual data
  const [totalPages] = React.useState(Math.ceil(totalItems / itemsPerPage));

  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  React.useEffect(() => {
    if (brands) {
      console.log("Fetched brands:", brands);
    }
  }, [brands]);

  if (isLoading) {
    return <div>Loading brands...</div>;
  }
  if (error) {
    return <div>Error loading brands: {String(error)}</div>;
  }

  return (
    <section>
      <BrandsHeader />
      <div className="px-2 md:px-8">
        <BrandsTable brands={brands} />
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
