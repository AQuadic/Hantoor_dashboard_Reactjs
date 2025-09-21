import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TermsHeader from "@/components/termsandconditions/TermsHeader";
import TermsTable from "@/components/termsandconditions/TermsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getPages, PagesResponse } from "@/api/pages/getPages";
import { getAllCountries, Country } from "@/api/countries/getCountry";
// select is rendered in TermsHeader; no local Select needed

const TermsAndConditions = () => {
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllCountries();
        if (!mounted) return;
        setCountries(all);
        // default to All (null) so the header Select shows 'All' and fetches all pages
        setSelectedCountryId(null);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const {
    data: pagesData,
    isLoading,
    refetch,
  } = useQuery<PagesResponse, Error>({
    queryKey: ["pages", page, selectedCountryId],
    queryFn: () =>
      getPages({
        pagination: "normal",
        ...(selectedCountryId ? { country_id: selectedCountryId } : {}),
      }),
    // enable once countries are loaded; when selectedCountryId is null ("All") we still want to fetch all pages
    enabled: countries !== null,
  });

  const pages = pagesData?.data || [];
  const perPage = pagesData?.meta?.per_page || 10;
  const totalItems = pagesData?.meta?.total || pages.length;
  const totalPages = pagesData?.meta?.last_page || 1;
  const from = pagesData?.meta?.from || 1;
  const to = pagesData?.meta?.to || pages.length;

  return (
    <div className="md:px-8 px-2">
      <TermsHeader
        countries={countries}
        selectedCountryId={selectedCountryId}
        onCountryChange={(id) => setSelectedCountryId(id)}
      />
      <div className="px-2 md:px-8">
        <TermsTable
          data={pages}
          from={from}
          isLoading={isLoading}
          refetch={refetch}
        />

        <div className="mt-4">
          {totalItems > 0 && (
            <TablePagination
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={perPage}
              from={from}
              to={to}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
