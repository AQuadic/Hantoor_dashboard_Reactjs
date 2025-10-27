import CountriesHeader from "@/components/countries/CountriesHeader";
import CountriesTable from "@/components/countries/CountriesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountries, CountriesResponse } from "@/api/countries/getCountry";
import { useTranslation } from "react-i18next";
import { useDatePicker } from "@/hooks/useDatePicker";

const CountriesPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTermAr, setSearchTermAr] = React.useState("");
  const [searchTermEn, setSearchTermEn] = React.useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const searchTerm = isArabic ? searchTermAr : searchTermEn;

  // Reset page to 1 when search term changes
  React.useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const { data, refetch, isLoading, error } = useQuery<CountriesResponse>({
    queryKey: ["countries", currentPage, searchTerm, dateParams],
    queryFn: () =>
      getCountries(
        currentPage,
        searchTerm,
        dateParams.from_date,
        dateParams.to_date
      ),
    placeholderData: undefined,
  });

  if (error) {
    return <div>Error loading countries: {String(error)}</div>;
  }

  return (
    <section>
      <CountriesHeader
        termAr={searchTermAr}
        termEn={searchTermEn}
        setTermAr={setSearchTermAr}
        setTermEn={setSearchTermEn}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8">
        <CountriesTable
          countries={data?.data ?? []}
          refetch={refetch}
          isLoading={isLoading}
        />
        {data?.data && data.data.length > 0 && (
          <TablePagination
            currentPage={data?.meta.current_page ?? currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.meta.last_page ?? 1}
            totalItems={data?.meta.total ?? data?.data.length ?? 0}
            itemsPerPage={data?.meta.per_page ?? 15}
            from={data?.meta.from ?? 0}
            to={data?.meta.to ?? 0}
          />
        )}
      </div>
    </section>
  );
};

export default CountriesPage;
