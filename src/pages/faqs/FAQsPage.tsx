import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FAQsHeader from "@/components/faqs/FAQsHeader";
import FAQsTable from "@/components/faqs/FAQsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getFAQs, FAQsResponse } from "@/api/faq/getFaq";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";

const FAQsPage = () => {
  const [page, setPage] = useState(1);
  const { data: faqsData, isLoading, refetch } = useQuery<FAQsResponse>({
    queryKey: ["faqs", page],
    queryFn: () => getFAQs({ pagination: "normal", page }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <Loading />;
  if (!faqsData || !faqsData.data) return <NoData />;

  const faqs = faqsData.data;
  const perPage = faqsData.meta?.per_page || 10;

  const totalItems = faqs.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, totalItems);

  const currentData = faqs.slice(from - 1, to);

  return (
    <div>
      <FAQsHeader />
      <div className="px-2 md:px-8">
        <FAQsTable data={currentData} from={from} refetch={refetch} />

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