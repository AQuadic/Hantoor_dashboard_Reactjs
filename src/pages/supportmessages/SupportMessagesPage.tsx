import { useState } from "react";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import SupportMessagesHeader from "@/components/supportmessages/SupportMessagesHeader";
import SupportMessagesTable from "@/components/supportmessages/SupportMessagesTable";
import { useQuery } from "@tanstack/react-query";
import { getSupportConversations, SupportConversationsResponse } from "@/api/support/getConversations";

const SupportMessagesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // <-- new search term
  const itemsPerPage = 5;
const { data, isLoading, refetch } = useQuery<SupportConversationsResponse, Error>({
  queryKey: ["supportConversations", currentPage, itemsPerPage, searchTerm],
  queryFn: () =>
    getSupportConversations({ 
      page: currentPage, 
      per_page: itemsPerPage, 
      search: searchTerm 
    }),
});
const filteredConversations = data?.data.filter((c) =>
  c.id.toString().includes(searchTerm)
) || [];

const totalItems = filteredConversations.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <SupportMessagesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="px-2 md:px-8">
        <SupportMessagesTable
          conversations={filteredConversations}
          isLoading={isLoading}
          refetch={refetch}
        />

        {totalItems > 0 && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            from={(currentPage - 1) * itemsPerPage + 1}
            to={Math.min(currentPage * itemsPerPage, totalItems)}
          />
        )}
      </div>
    </div>
  );
};

export default SupportMessagesPage;