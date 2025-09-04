import { useState } from "react";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import SupportMessagesHeader from "@/components/supportmessages/SupportMessagesHeader";
import SupportMessagesTable from "@/components/supportmessages/SupportMessagesTable";
import { useQuery } from "@tanstack/react-query";
import { getSupportConversations, SupportConversationsResponse } from "@/api/support/getConversations";

const SupportMessagesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data } = useQuery<SupportConversationsResponse, Error>({
    queryKey: ["supportConversations", currentPage, itemsPerPage],
    queryFn: () => getSupportConversations({ page: currentPage, per_page: itemsPerPage }),
  });

  const totalItems = data?.total || 0;
  const totalPages = data?.last_page || 1;

  return (
    <div>
      <SupportMessagesHeader />
      <div className="px-2 md:px-8">
        <SupportMessagesTable page={currentPage} itemsPerPage={itemsPerPage} />

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