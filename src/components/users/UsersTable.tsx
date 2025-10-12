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
import { useHasPermission } from "@/hooks/usePermissions";
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
  const canEdit = useHasPermission("edit_user");
  const canChangePassword = useHasPermission("edit_user");
  const canChangeStatus = useHasPermission("change-status_user");
  const canBlock = useHasPermission("block_user");

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "adminUsers",
      searchTerm,
      page,
      perPage,
      dateParams,
      countryId,
      signupWith,
    ],
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
    // Parse the ISO date portion (yyyy-mm-dd) directly to avoid
    // timezone conversions when creating a JS Date which can shift
    // the local day/month and cause an off-by-one month issue.
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})/;
    const isoMatch = isoRegex.exec(dateString);
    if (!isoMatch) return undefined;
    const [, ys, ms, ds] = isoMatch;
    const y = Number(ys);
    const m = Number(ms);
    const day = Number(ds);
    if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(day))
      return undefined;
    try {
      return new CalendarDate(y, m, day);
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

  // Check if any filters are active
  const hasActiveFilters = !!(
    searchTerm ||
    countryId ||
    signupWith ||
    dateParams?.from_date ||
    dateParams?.to_date
  );

  // Only show NoData if there are no results AND no active filters
  if (users.length === 0 && !hasActiveFilters) return <NoData />;

  const signupMethodLabels: Record<string, string> = {
    all: t("all"),
    apple: t("apple"),
    google: t("google"),
    phone: t("phone"),
    email: t("email"),
    admin: t("admin"),
    facebook: t("facebook"),
  };

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
          {canBlock && (
            <TableHead className="text-right">
              {t("suspensionDuration")}
            </TableHead>
          )}
          {(canChangeStatus || canEdit || canChangePassword || canBlock) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={15} className="text-center py-8 text-gray-500">
              {t("noResultsFound")}
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id} noBackgroundColumns={2}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.image?.url ? (
                  <img
                    src={user.image.url}
                    alt={user.name}
                    className="w-[48px] h-[48px] rounded-lg object-cover"
                  />
                ) : (
                  <TableImagePlaceholder className="w-[48px] h-[48px]" />
                )}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell dir="ltr">{user.phone || "-"}</TableCell>
              <TableCell>{user.email || "-"}</TableCell>
              <TableCell>
                {formatDate(user.created_at, i18n.language)}
              </TableCell>
              <TableCell>
                {user.created_by
                  ? signupMethodLabels[user.created_by] ?? user.created_by
                  : "-"}
              </TableCell>

              <TableCell>
                {user.country
                  ? (() => {
                      const langKey = i18n.language === "ar" ? "ar" : "en";
                      return user.country.name[langKey];
                    })()
                  : "-"}
              </TableCell>
              <TableCell>{user.search_histories_count}</TableCell>
              <TableCell>{user.request_insurance_price_count}</TableCell>
              <TableCell>{user.favorite_cars_count}</TableCell>
              <TableCell>
                {user.country?.currency_text?.[i18n.language as "ar" | "en"] ??
                  "-"}
              </TableCell>
              <TableCell>
                {formatLastOnline(user.last_online, i18n.language)}
              </TableCell>
              {canBlock && (
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
              )}
              {(canChangeStatus ||
                canEdit ||
                canChangePassword ||
                canBlock) && (
                <TableCell className="flex items-center gap-[7px]">
                  {canChangeStatus && (
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
                  )}
                  {canEdit && (
                    <Link to={`/users/edit/${user.id}`}>
                      <Edit />
                    </Link>
                  )}
                  {canChangePassword && (
                    <Link to={`/users/change-password/${user.id}`}>
                      <Password />
                    </Link>
                  )}
                  <TableDeleteButton
                    handleDelete={() => handleDelete(user.id)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
