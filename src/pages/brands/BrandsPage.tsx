import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, BrandsApiResponse } from "@/api/brand/fetchBrands";
import { useTranslation } from "react-i18next";

const BrandsPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTermAr, setSearchTermAr] = React.useState("");
  const [searchTermEn, setSearchTermEn] = React.useState("");

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const searchTerm = isArabic ? searchTermAr : searchTermEn;

  const { data, refetch, isLoading, error } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", currentPage, searchTerm],
    queryFn: () => fetchBrands(currentPage, searchTerm),
    placeholderData: undefined,
  });

  React.useEffect(() => {
    if (data) {
      console.log("Fetched brands:", data.data);
    }
  }, [data]);

  if (error) {
    return <div>Error loading brands: {String(error)}</div>;
  }

  return (
    <section>
      <BrandsHeader
        termAr={searchTermAr}
        termEn={searchTermEn}
        setTermAr={setSearchTermAr}
        setTermEn={setSearchTermEn}
      />
      <div className="px-2 md:px-8">
        <BrandsTable brands={data?.data ?? []} refetch={refetch} isLoading={isLoading}  />
        {data?.data && data.data.length > 0 && (
        <TablePagination
          currentPage={data?.current_page ?? currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.last_page ?? 1}
          totalItems={data?.total ?? 0}
          itemsPerPage={data?.per_page ?? 15}
          from={data?.from ?? 0}
          to={data?.to ?? 0}
        />
        )}
      </div>
    </section>
  );
};

export default BrandsPage;
