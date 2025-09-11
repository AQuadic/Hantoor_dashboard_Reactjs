import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NotificationsHeader from "@/components/notifactions/NotificationsHeader";
import NotificationTable from "@/components/notifactions/NotificationTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import {
  BroadcastNotificationsResponse,
  getBroadcastNotifications,
} from "@/api/notifications/getNotifications";
import { useDatePicker } from "@/hooks/useDatePicker";

const NotificationPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useQuery<BroadcastNotificationsResponse, Error>({
    queryKey: ["notifications", page, searchTerm, dateParams],
    queryFn: () =>
      getBroadcastNotifications({
        pagination: "normal",
        search: searchTerm,
        ...dateParams,
      }),
  });

  const notifications = notificationsData?.data || [];
  const perPage = notificationsData?.meta?.per_page || 10;
  const totalItems = notificationsData?.meta?.total || notifications.length;
  const totalPages = notificationsData?.meta?.last_page || 1;
  const from = notificationsData?.meta?.from || 1;
  const to = notificationsData?.meta?.to || notifications.length;

  return (
    <div>
      <NotificationsHeader
        onSearch={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8">
        <NotificationTable
          data={notifications}
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

export default NotificationPage;
