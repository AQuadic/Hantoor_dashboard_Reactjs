import { Link } from "react-router-dom";
import { useState } from "react";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getBroadcastNotifications, BroadcastNotification } from "@/api/notifications/getNotifications";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

const NotificationTable = () => {
    const { t } = useTranslation("notifications");
const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (id: number) => {
        setExpandedRows((prev) => ({
        ...prev,
        [id]: !prev[id]
        }));
    };

  const { data, isLoading } = useQuery({
    queryKey: ["broadcastNotifications"],
    queryFn: () => getBroadcastNotifications({ per_page: 50 }),
  });

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  const notifications: BroadcastNotification[] = data?.data || [];

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('image')}</TableHead>
            <TableHead className="text-right">{t('textTitle')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('description')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {notifications.map((notification, index) => {
            const isExpanded = expandedRows[notification.id];
            const shortDescription =
                notification.body.en.length > 50
                    ? notification.body.en.slice(0, 50) + "..."
                    : notification.body.en;

            return (
                <TableRow key={notification.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                <img src={notification.image} alt="Car" className="rounded-[8px]" />
                </TableCell>
                <TableCell>{notification.title.en}</TableCell>
                <TableCell>{notification.country_id}</TableCell>
                <TableCell className="w-full">
                {isExpanded ? notification.body.en : shortDescription}
                {notification.body.en.length > 50 && (
                    <button
                    className="text-blue-600 ml-2 hover:underline"
                    onClick={() => toggleExpand(notification.id)}
                    >
                    {isExpanded ? "Show Less" : "Show More"}
                    </button>
                )}
                </TableCell>
                <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link to={`/notifications/details/${notification.id}`}>
                    <View />
                    </Link>
                    <div className="mt-2">
                    <TableDeleteButton handleDelete={() => {}} />
                    </div>
                </TableCell>
                </TableRow>
            )})}
        </TableBody>
        </Table>
    )
}

export default NotificationTable
