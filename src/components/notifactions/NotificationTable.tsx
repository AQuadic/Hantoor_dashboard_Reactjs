import { Link } from "react-router-dom";
import { useState } from "react";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import View from "../icons/general/View";
import { useTranslation } from "react-i18next";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deleteNotification } from "@/api/notifications/deleteNotification";
import toast from "react-hot-toast";
import { BroadcastNotification } from "@/api/notifications/getNotifications";

interface NotificationTableProps {
  data: BroadcastNotification[];
  from: number;
  isLoading: boolean;
  refetch: () => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  data,
  from,
  isLoading,
  refetch,
}) => {
    const { t, i18n } = useTranslation("notifications");
const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (id: number) => {
        setExpandedRows((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

  const handleDelete = async (id: number) => {
    await deleteNotification(id);
    toast.success(t("notificationDeleted"));
    refetch();
  };

  if (isLoading) return <Loading />
  if (!data || data.length === 0) return <NoData />

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('image')}</TableHead>
            <TableHead className="text-right">{t('textTitle')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('description')}</TableHead>
            <TableHead className="text-right">{t('')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((notification, index) => {
            const isExpanded = expandedRows[notification.id];
            const bodyText = i18n.language === "ar" ? notification.body.ar : notification.body.en;

            const shortDescription =
            bodyText.length > 50 ? bodyText.slice(0, 50) + "..." : bodyText;

            return (
                <TableRow key={notification.id} noBackgroundColumns={1}>
                <TableCell>{from + index}</TableCell>
                <TableCell>
                    {notification.image && "url" in notification.image ? (
                    <img src={notification.image.url} alt="Notification" className="w-16 h-16 object-cover rounded-md" />
                    ) : (
                    <span>No image</span>
                    )}
                </TableCell>
                <TableCell>{i18n.language === "ar" ? notification.title.ar : notification.title.en}</TableCell>
                <TableCell>
                {i18n.language === "ar"
                    ? notification.country?.name?.ar ?? "-"
                    : notification.country?.name?.en ?? "-"}
                </TableCell>
                <TableCell className="w-full">
                    {isExpanded ? bodyText : shortDescription}
                    {bodyText.length > 50 && (
                    <button
                        className="text-blue-600 ml-2 hover:underline"
                        onClick={() => toggleExpand(notification.id)}
                    >
                        {isExpanded ? t("showLess") : t("showMore")}
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
                    <TableDeleteButton handleDelete={() => handleDelete(notification.id)} />
                    </div>
                </TableCell>
                </TableRow>
            )})}
        </TableBody>
        </Table>
    )
}

export default NotificationTable
