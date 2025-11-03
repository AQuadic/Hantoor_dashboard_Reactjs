import React, { useState } from "react";
import InsuranceHeader from "@/components/setting/insuranceprice/InsuranceHeader";
import InsuranceTable from "@/components/setting/insuranceprice/InsuranceTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { useQuery } from "@tanstack/react-query";
import {
  getRequestFinancing,
  FinancingApiResponse,
} from "@/api/financing/fetchFinancing";

const InsurancePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to first page when selected country changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["request-financing", currentPage, selectedCountry],
    queryFn: async () => {
      const countryId = selectedCountry ? Number(selectedCountry) : undefined;
      const resp = await getRequestFinancing(currentPage, countryId, true);
      // If API for some reason returns an array (non-paginated), wrap it to paginated shape
      if (Array.isArray(resp)) {
        const wrapped: FinancingApiResponse = {
          current_page: 1,
          data: resp,
          first_page_url: "",
          from: resp.length > 0 ? 1 : 0,
          last_page: 1,
          last_page_url: "",
          next_page_url: null,
          path: "",
          per_page: resp.length,
          prev_page_url: null,
          to: resp.length,
          total: resp.length,
        };
        return wrapped;
      }

      return resp;
    },
    placeholderData: undefined,
  });

  return (
    <div className="px-2 md:px-8">
      <InsuranceHeader
        searchTerm={searchTerm}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <InsuranceTable
        selectedCountry={selectedCountry}
        financingItems={data?.data ?? []}
        isLoading={isLoading}
        refetch={() => refetch()}
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
  );
};

export default InsurancePage;
