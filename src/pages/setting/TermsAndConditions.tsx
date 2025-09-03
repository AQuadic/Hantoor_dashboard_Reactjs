import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TermsHeader from "@/components/termsandconditions/TermsHeader";
import TermsTable from "@/components/termsandconditions/TermsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getPages, PagesResponse } from "@/api/pages/getPages";

const TermsAndConditions = () => {
  const [page, setPage] = useState(1);

  const { data: pagesData, isLoading, refetch } = useQuery<PagesResponse, Error>({
    queryKey: ["pages", page],
    queryFn: () =>
      getPages({
        pagination: "normal",
      }),
  });

  const pages = pagesData?.data || [];
  const perPage = pagesData?.meta?.per_page || 10;
  const totalItems = pagesData?.meta?.total || pages.length;
  const totalPages = pagesData?.meta?.last_page || 1;
  const from = pagesData?.meta?.from || 1;
  const to = pagesData?.meta?.to || pages.length;

  return (
    <div className="md:px-8 px-2">
      <TermsHeader />
      <div className="px-2 md:px-8">
        <TermsTable data={pages} from={from} isLoading={isLoading} refetch={refetch} />

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