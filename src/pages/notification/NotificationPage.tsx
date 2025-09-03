import React, { useState } from "react";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import NotificationsHeader from "@/components/notifactions/NotificationsHeader";
import NotificationTable from "@/components/notifactions/NotificationTable";

const NotificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <NotificationsHeader onSearch={setSearchTerm} />
      <div className="md:px-8 px-2">
        <NotificationTable searchTerm={searchTerm} perPage={50} />
        <TablePagination
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={20}
          totalItems={20}
          itemsPerPage={5}
          from={1}
          to={5}
        />
      </div>
    </div>
  );
};

export default NotificationPage;
