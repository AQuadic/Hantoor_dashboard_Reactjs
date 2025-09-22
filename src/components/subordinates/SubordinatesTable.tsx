import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "@/api/admins/getAdmins";
import type { DateFilterParams } from "@/utils/dateUtils";
import { deleteAdmin } from "@/api/admins/deleteAdmin";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { updateAdmin } from "@/api/admins/editAdmin";
import TableImagePlaceholder from "../general/TableImagePlaceholder";

interface SubordinatesTableProps {
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly searchTerm?: string;
  readonly dateParams?: DateFilterParams;
}

export function SubordinatesTable({
  currentPage,
  itemsPerPage,
  searchTerm,
  dateParams,
}: SubordinatesTableProps) {
  const { t, i18n } = useTranslation("subordinates");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admins", currentPage, itemsPerPage, searchTerm, dateParams],
    queryFn: () =>
      getAdmins({
        search: searchTerm,
        pagination: "normal",
        per_page: itemsPerPage,
        page: currentPage,
        ...(dateParams || {}),
      }),
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteAdmin(id);
      toast.success(t("adminDeleted"));
      refetch();
    } catch {
      toast.error(t("error"));
    }
  };

  const handleToggleStatus = async (id: number, current: boolean) => {
    try {
      await updateAdmin(id, { isActive: !current });
      toast.success(!current ? t("adminActivated") : t("adminDeactivated"));
      refetch();
    } catch {
      toast.error(t("error"));
    }
  };

  const formatDateTime = (dateStr: string | null, lang: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);

    return date.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) return <Loading />;
  if (!data?.data || data.data.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("image")}</TableHead>
          <TableHead className="text-right">{t("name")}</TableHead>
          <TableHead className="text-right">{t("phoneNumber")}</TableHead>
          <TableHead className="text-right">{t("email")}</TableHead>
          <TableHead className="text-right">{t("dateTime")}</TableHead>
          <TableHead className="text-right">
            {t("administrativePositions")}
          </TableHead>
          <TableHead className="text-right">{t("lastLogin")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((admin, index) => (
          <TableRow key={admin.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {admin.image?.responsive_urls?.[0] || admin.image?.url ? (
                <img
                  src={
                    admin.image?.responsive_urls?.[0] ||
                    admin.image?.url ||
                    "/images/admin/admin1.svg"
                  }
                  alt={admin.name || "admin"}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/admin/admin1.svg";
                  }}
                />
              ) : (
                <TableImagePlaceholder className="w-10 h-10" />
              )}
            </TableCell>
            <TableCell>{admin.name}</TableCell>
            <TableCell dir="ltr">{admin.phone || "-"}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              {formatDateTime(admin.created_at, i18n.language)}
            </TableCell>
            <TableCell>
              {admin.roles && admin.roles.length > 0
                ? admin.roles[0].name
                : "-"}
            </TableCell>
            <TableCell>
              {admin?.last_online
                ? new Date(admin.last_online).toLocaleString(
                    i18n.language === "ar" ? "ar-EG" : "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "..."}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={!!admin.is_active}
                onChange={() => handleToggleStatus(admin.id, !!admin.is_active)}
              />
              <Link to={`/subordinates/${admin.id}`}>
                <Edit />
              </Link>
              <Link to={`/subordinates/change_password/${admin.id}`}>
                <Password />
              </Link>
              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(admin.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
