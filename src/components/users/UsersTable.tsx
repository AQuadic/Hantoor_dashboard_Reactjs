import { Link } from "react-router";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch, Select, SelectItem } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import userPlaceholder from "/images/users/user1.svg";
import {
  AdminUser,
  AdminUsersResponse,
  getAdminUsers,
} from "@/api/users/getUsers";
import { DateFilterParams } from "@/utils/dateUtils";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deleteUser } from "@/api/users/deleteUser";
import toast from "react-hot-toast";
import { updateAdminUser } from "@/api/users/editUsers";

interface UserTableProps {
  readonly searchTerm?: string;
  readonly page: number;
  readonly perPage: number;
  readonly dateParams?: DateFilterParams;
  readonly onDataLoaded: (meta: AdminUsersResponse["meta"]) => void;
}

export function UserTable({
  searchTerm = "",
  page,
  perPage,
  dateParams = {},
  onDataLoaded,
}: UserTableProps) {
  const { t, i18n } = useTranslation("users");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminUsers", searchTerm, page, perPage, dateParams],
    queryFn: () =>
      getAdminUsers({
        search: searchTerm || undefined,
        page,
        per_page: perPage,
        pagination: "normal",
        ...dateParams,
      }),
  });

  const users: AdminUser[] = data?.data || [];

  const formatDate = (date?: string, lang: string = "en") => {
    if (!date) return "Invalid Date";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid Date";

    const isArabic = lang.startsWith("ar");

    const formatted = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);

    if (isArabic) {
      return formatted.replace("ص", "ص").replace("م", "م");
    }

    return formatted;
  };

  const formatLastOnline = (date?: string, lang: string = "en") => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const isArabic = lang.startsWith("ar");

  const formatted = new Intl.DateTimeFormat(
    isArabic ? "ar-EG" : "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  ).format(d);

  return formatted;
};


  if (data?.meta) {
    onDataLoaded(data.meta);
  }

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    toast.success(t("userDeleted"));
    refetch();
  };

  if (isLoading) return <Loading />;
  if (users.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("image")}</TableHead>
          <TableHead className="text-right">{t("name")}</TableHead>
          <TableHead className="text-right">{t("phone")}</TableHead>
          <TableHead className="text-right">{t("email")}</TableHead>
          <TableHead className="text-right">{t("dateAndTime")}</TableHead>
          <TableHead className="text-right">
            {t("registrationMethod")}
          </TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("NOSearches")}</TableHead>
          <TableHead className="text-right">{t("numberOfInsurance")}</TableHead>
          <TableHead className="text-right">{t("carNumbers")}</TableHead>
          <TableHead className="text-right">{t("currency")}</TableHead>
          <TableHead className="text-right">{t("active")}</TableHead>
          <TableHead className="text-right">
            {t("suspensionDuration")}
          </TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id} noBackgroundColumns={2}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img
                src={user.image?.url || userPlaceholder}
                alt={user.name}
                className="w-[52.3px] h-[51px] rounded-full"
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell dir="ltr">{user.phone || "-"}</TableCell>
            <TableCell>{user.email || "-"}</TableCell>
            <TableCell>{formatDate(user.created_at, i18n.language)}</TableCell>
            <TableCell>{user.signup_with}</TableCell>
            <TableCell>{user.country ? user.country.name.en : "-"}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell>{formatLastOnline(user.last_online, i18n.language)}</TableCell>
            <TableCell>
              <div className="w-[160px]">
                <Select
                  items={[{ key: "1", label: "حدد المدة" }]}
                  label="حدد المدة"
                  classNames={{
                    trigger:
                      "h-9 !h-9 min-h-9 bg-white border !py-5 rounded-[5px]",
                    label: "text-sm text-gray-700",
                    listbox: "bg-white shadow-md",
                  }}
                >
                  {(option) => <SelectItem>{option.label}</SelectItem>}
                </Select>
              </div>
            </TableCell>
            <TableCell className="flex items-center gap-[7px]">
              <Switch
                isSelected={user.is_active}
                onChange={async (e) => {
                  try {
                    await updateAdminUser(user.id, { is_active: e.target.checked });
                    toast.dismiss()
                    toast.success(t('statusUpdated'));
                    refetch();
                  } catch (error: any) {
                    const message =
                      error?.response?.data?.message ||
                      error?.message ||
                      t("error");
                    toast.error(message);
                  }
                }}
              />
              <Link to={`/users/edit/${user.id}`}>
                <Edit />
              </Link>
              <Link to={`/users/change-password/${user.id}`}>
                <Password />
              </Link>
              <TableDeleteButton handleDelete={() => handleDelete(user.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
