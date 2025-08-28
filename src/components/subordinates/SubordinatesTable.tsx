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
import { deleteAdmin } from "@/api/admins/deleteAdmin";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { updateAdmin } from "@/api/admins/editAdmin";

interface SubordinatesTableProps {
  currentPage: number;
  itemsPerPage: number;
  searchTerm?: string;
}

export function SubordinatesTable({ currentPage, itemsPerPage, searchTerm }: SubordinatesTableProps) {
  const { t } = useTranslation("subordinates");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admins", currentPage, itemsPerPage, searchTerm],
    queryFn: () =>
      getAdmins({
        search: searchTerm,
        pagination: "normal",
        per_page: itemsPerPage,
        page: currentPage,
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
          <TableHead className="text-right">{t("administrativePositions")}</TableHead>
          <TableHead className="text-right">{t("lastLogin")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((admin, index) => (
          <TableRow key={admin.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{admin.name}</TableCell>
            <TableCell>{admin.phone || "-"}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.created_at}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{admin.updated_at}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={!!admin.isActive}
                onChange={() => handleToggleStatus(admin.id, !!admin.isActive)}
              />
              <Link to={`/subordinates/${admin.id}`}>
                <Edit />
              </Link>
              <Link to={`/subordinates/change_password/${admin.id}`}>
                <Password />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(admin.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}