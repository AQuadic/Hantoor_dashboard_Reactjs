import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FAQsHeader from "@/components/faqs/FAQsHeader";
import FAQsTable from "@/components/faqs/FAQsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getFAQs, FAQsResponse } from "@/api/faq/getFaq";

const FAQsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: faqsData, isLoading, refetch } = useQuery<FAQsResponse, Error>({
    queryKey: ["FrequentQuestions", page, search],
    queryFn: () =>
      getFAQs({
        pagination: "normal",
        page,
        type: "Frequent Questions",
        search
      }),
  });

  const faqs = faqsData?.data || [];
  const perPage = faqsData?.meta?.per_page || 10;
  const totalItems = faqsData?.meta?.total || faqs.length;
  const totalPages = faqsData?.meta?.last_page || 1;
  const from = faqsData?.meta?.from || 1;
  const to = faqsData?.meta?.to || faqs.length;

  return (
    <div>
      <FAQsHeader search={search} setSearch={setSearch} />
      <div className="px-2 md:px-8">
        <FAQsTable data={faqs} from={from} isLoading={isLoading} refetch={refetch} />

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

export default FAQsPage;