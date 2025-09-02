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
  if (!faqsData) return <NoData />;

  const { meta, data } = faqsData;

  return (
    <div>
      <FAQsHeader />
      <div className="px-2 md:px-8">
        <FAQsTable data={data} from={meta.from} refetch={refetch} />

        <div className="mt-4">
          {data.length > 0 && (
          <TablePagination
            currentPage={meta.current_page}
            setCurrentPage={setPage}
            totalPages={meta.last_page ?? 1}
            totalItems={meta.total}
            itemsPerPage={meta.per_page}
            from={meta.from}
            to={meta.to}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;