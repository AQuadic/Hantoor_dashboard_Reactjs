import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, BrandsApiResponse } from "@/api/brand/fetchBrands";
import { useTranslation } from "react-i18next";
import { useDatePicker } from "@/hooks/useDatePicker";

const BrandsPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTermAr, setSearchTermAr] = React.useState("");
  const [searchTermEn, setSearchTermEn] = React.useState("");
  const {
    dateRange: brandDateRange,
    setDateRange: setBrandDateRange,
    dateParams,
  } = useDatePicker();

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const searchTerm = isArabic ? searchTermAr : searchTermEn;

  const { data, refetch, isLoading, error } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", currentPage, searchTerm, dateParams],
    queryFn: async () => {
      const response = await fetchBrands(
        currentPage,
        searchTerm,
        dateParams.from_date,
        dateParams.to_date
      );
      // Ensure we always return BrandsApiResponse for paginated queries
      return Array.isArray(response)
        ? {
            current_page: 1,
            data: response,
            first_page_url: "",
            from: 0,
            last_page: 1,
            last_page_url: "",
            links: [],
            next_page_url: null,
            path: "",
            per_page: response.length,
            prev_page_url: null,
            to: response.length,
            total: response.length,
          }
        : response;
    },
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
        dateRange={brandDateRange}
        setDateRange={setBrandDateRange}
      />
      <div className="px-2 md:px-8">
        <BrandsTable
          brands={data?.data ?? []}
          refetch={refetch}
          isLoading={isLoading}
        />
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
