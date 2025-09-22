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
import { Switch } from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { CalendarDate } from "@internationalized/date";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
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
import TableImagePlaceholder from "../general/TableImagePlaceholder";

interface UserTableProps {
  readonly searchTerm?: string;
  readonly page: number;
  readonly perPage: number;
  readonly dateParams?: DateFilterParams;
  readonly countryId?: number; 
  readonly signupWith?: string; 
  readonly onDataLoaded: (meta: AdminUsersResponse["meta"]) => void;
}

export function UserTable({
  searchTerm = "",
  page,
  perPage,
  dateParams = {},
  countryId,
  signupWith,
  onDataLoaded,
}: UserTableProps) {
  const { t, i18n } = useTranslation("users");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminUsers", searchTerm, page, perPage, dateParams, countryId, signupWith],
    queryFn: () =>
      getAdminUsers({
        search: searchTerm || undefined,
        page,
        per_page: perPage,
        pagination: "normal",
        country_id: countryId,
        signup_with: signupWith,
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

    const formatted = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);

    return formatted;
  };

  const toCalendarDate = (dateString?: string): CalendarDate | undefined => {
    if (!dateString) return undefined;
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return undefined;
    // CalendarDate expects yyyy-mm-dd
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    try {
      return new CalendarDate(y, Number(m), Number(day));
    } catch {
      return undefined;
    }
  };

  const calendarDateToISO = (cd?: CalendarDate | null): string | undefined => {
    if (!cd) return undefined;
    // cd.toString() returns yyyy-mm-dd
    // append time to mark end of day as blocked until
    return `${cd.toString()}T23:59:59Z`;
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
              {user.image?.url ? (
                <img
                  src={user.image.url}
                  alt={user.name}
                  className="w-[52.3px] h-[51px] rounded-full"
                />
              ) : (
                <TableImagePlaceholder className="w-10 h-10" />
              )}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell dir="ltr">{user.phone || "-"}</TableCell>
            <TableCell>{user.email || "-"}</TableCell>
            <TableCell>{formatDate(user.created_at, i18n.language)}</TableCell>
            <TableCell>{user.created_by}</TableCell>
            <TableCell>
              {user.country
                ? user.country.name[i18n.language === "ar" ? "ar" : "en"]
                : "-"}
            </TableCell>
            <TableCell>{user.search_histories_count}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell>
              {user.country?.currency_text?.[i18n.language as "ar" | "en"] ?? "-"}
            </TableCell>
            <TableCell>
              {formatLastOnline(user.last_online, i18n.language)}
            </TableCell>
            <TableCell>
              <div className="w-[160px]" dir="ltr">
                <DatePicker
                  aria-label="blocked until"
                  value={toCalendarDate(user.blocked_until ?? undefined)}
                  onChange={async (val) => {
                    const iso = calendarDateToISO(val);
                    try {
                      const payload: import("@/api/users/editUsers").UpdateAdminUserPayload =
                        iso ? { blocked_until: iso } : {};
                      await updateAdminUser(user.id, payload);
                      toast.success(t("statusUpdated"));
                      refetch();
                    } catch (err) {
                      const errorLike = err as
                        | {
                            response?: { data?: { message?: string } };
                            message?: string;
                          }
                        | undefined;
                      const message =
                        errorLike?.response?.data?.message ||
                        errorLike?.message ||
                        t("error");
                      toast.error(message);
                    }
                  }}
                />
              </div>
            </TableCell>
            <TableCell className="flex items-center gap-[7px]">
              <Switch
                isSelected={user.is_active}
                onChange={async (e) => {
                  try {
                    await updateAdminUser(user.id, {
                      is_active: e.target.checked,
                    });
                    toast.dismiss();
                    toast.success(t("statusUpdated"));
                    refetch();
                  } catch (err) {
                    const errorLike = err as
                      | {
                          response?: { data?: { message?: string } };
                          message?: string;
                        }
                      | undefined;
                    const message =
                      errorLike?.response?.data?.message ||
                      errorLike?.message ||
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
