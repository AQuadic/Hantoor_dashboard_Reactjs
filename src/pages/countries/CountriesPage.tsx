import CountriesHeader from "@/components/countries/CountriesHeader";
import CountriesTable from "@/components/countries/CountriesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountries, CountriesResponse } from "@/api/countries/getCountry";
import { useTranslation } from "react-i18next";
import Loading from "@/components/general/Loading";

const CountriesPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTermAr, setSearchTermAr] = React.useState("");
  const [searchTermEn, setSearchTermEn] = React.useState("");

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const searchTerm = isArabic ? searchTermAr : searchTermEn;

  const { data, refetch, isLoading, error } = useQuery<CountriesResponse>({
    queryKey: ["countries", currentPage, searchTerm],
    queryFn: () => getCountries(currentPage, searchTerm),
    placeholderData: undefined,
  });

  if (isLoading) {
    return <Loading />;
  }
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
