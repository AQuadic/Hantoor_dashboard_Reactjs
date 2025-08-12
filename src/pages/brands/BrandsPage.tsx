import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, BrandsApiResponse } from "@/api/brand/fetchBrands";

const BrandsPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isLoading, error } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", currentPage],
    queryFn: () => fetchBrands(currentPage),
    placeholderData: undefined,
  });

  React.useEffect(() => {
    if (data) {
      console.log("Fetched brands:", data.data);
    }
  }, [data]);

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
        <BrandsTable brands={data?.data ?? []} />
        <TablePagination
          currentPage={data?.current_page ?? 1}
          setCurrentPage={setCurrentPage}
          totalPages={data?.last_page ?? 1}
          totalItems={data?.total ?? 0}
          itemsPerPage={data?.per_page ?? 15}
        />
      </div>
    </section>
  );
};

export default BrandsPage;
