import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TechnicalsupportHeader from "@/components/technicalsupport/TechnicalsupportHeader";
import TechnicalSupportTable from "@/components/technicalsupport/TechnicalSupportTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getFAQs, FAQsResponse } from "@/api/faq/getFaq";
import { useDatePicker } from "@/hooks/useDatePicker";

const TechnicalSupport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  const { data, isLoading, refetch } = useQuery<FAQsResponse, Error>({
    queryKey: ["TechnicalSupportFAQs", page, search, dateParams],
    queryFn: () =>
      getFAQs({
        pagination: "normal",
        page,
        type: "Technical Support Questions",
        search,
        ...dateParams,
      }),
  });

  const faqs = data?.data || [];
  const perPage = data?.meta?.per_page || 5;
  const totalItems = data?.meta?.total || faqs.length;
  const totalPages = data?.meta?.last_page || 1;
  const from = data?.meta?.from || 1;
  const to = data?.meta?.to || faqs.length;

  return (
    <div>
      <TechnicalsupportHeader
        search={search}
        setSearch={setSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8">
        <TechnicalSupportTable
          data={faqs}
          from={from}
          isLoading={isLoading}
          refetch={refetch}
        />

        {totalItems > 0 && (
          <div className="mt-4">
            <TablePagination
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={perPage}
              from={from}
              to={to}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalSupport;
