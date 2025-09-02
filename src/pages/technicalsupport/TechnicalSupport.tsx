import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TechnicalsupportHeader from "@/components/technicalsupport/TechnicalsupportHeader";
import TechnicalSupportTable from "@/components/technicalsupport/TechnicalSupportTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getFAQs, FAQsResponse } from "@/api/faq/getFaq";

const TechnicalSupport = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<FAQsResponse, Error>({
    queryKey: ["TechnicalSupportFAQs", page],
    queryFn: () =>
      getFAQs({
        pagination: "normal",
        page,
        type: "Technical Support Questions",
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
      <TechnicalsupportHeader />
      <div className="px-2 md:px-8">
        <TechnicalSupportTable
          data={faqs}
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

export default TechnicalSupport;
