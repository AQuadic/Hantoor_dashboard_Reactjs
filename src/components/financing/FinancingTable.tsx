import { useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";
import { setFinancingStatus } from "@/api/financing/setFinancingStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import View from "../icons/general/View";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import Delete from "../icons/general/Delete";
import NoData from "../general/NoData";

export interface FinancingCountry {
  id: number;
  name: { ar: string; en: string };
  banks_count: number;
  is_active: boolean;
}

interface FinancingTableProps {
  data: FinancingCountry[];
  isLoading: boolean;
  error: Error | null;
}

const FinancingTable = ({ data, isLoading, error }: FinancingTableProps) => {
  const { t, i18n } = useTranslation("financing");
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const canChangeStatus = useHasPermission("change-status_finance");
  const canViewFinance = useHasPermission("view_finance");
  // The 'View' action for financing countries should depend on bank viewing permission
  const canViewBank = useHasPermission("view_bank");
  const canDelete = useHasPermission("delete_finance");
  const showActionsColumn =
    canChangeStatus || canViewFinance || canViewBank || canDelete;

  const handleViewCountry = (country: FinancingCountry) => {
    const countryName = isArabic ? country.name.ar : country.name.en;

    navigate(`/financing/details/${country.id}`, {
      state: {
        country: countryName,
        countryId: country.id,
      },
    });
  };

  const queryClient = useQueryClient();

  const handleToggleStatus = async (
    country: FinancingCountry,
    checked: boolean
  ) => {
    try {
      await setFinancingStatus({
        country_id: country.id,
        is_active: checked ? 1 : 0,
      });
      toast.dismiss();
      toast.success(
        t("statusUpdated") || (isArabic ? "تم التحديث" : "Status updated")
      );
      // Invalidate financing queries to refresh the table
      queryClient.invalidateQueries({ queryKey: ["financing"] });
    } catch (err) {
      const axiosError = err as
        | { response?: { data?: { message?: string } }; message?: string }
        | undefined;
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        (isArabic ? "حدث خطأ" : "Error");
      toast.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFinancing(id);
      // Invalidate financing queries to refetch updated list
      queryClient.invalidateQueries({ queryKey: ["financing"] });
    } catch (err) {
      console.error("Failed to delete financing:", err);
      // Show localized toast error
      toast.error(
        t("deleteFailed") || (isArabic ? "فشل الحذف" : "Delete failed")
      );
    }
  };

  if (isLoading)
    return (
      <div className="py-8 text-center">
        {isArabic ? "جاري التحميل..." : "Loading..."}
      </div>
    );
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        {isArabic ? "حدث خطأ" : "Error"}
      </div>
    );
  if (!data || data.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("NOBanks")}</TableHead>
          {showActionsColumn && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((country) => (
          <TableRow key={country.id} noBackgroundColumns={1}>
            <TableCell>{country.id}</TableCell>
            <TableCell>
              {isArabic ? country.name.ar : country.name.en}
            </TableCell>
            <TableCell className="w-full">{country.banks_count}</TableCell>
            {showActionsColumn && (
              <TableCell className="flex items-center gap-2">
                {canChangeStatus && (
                  <Switch
                    isSelected={country.is_active}
                    onChange={async (e) => {
                      // Prevent row click navigation when toggling
                      e.stopPropagation();
                      if (country.banks_count === 0) return;
                      await handleToggleStatus(country, e.target.checked);
                    }}
                  />
                )}

                {canViewBank && (
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => handleViewCountry(country)}
                    aria-label={
                      isArabic
                        ? `عرض ${country.name.ar}`
                        : `View ${country.name.en}`
                    }
                  >
                    <View />
                  </button>
                )}

                {canDelete &&
                  (country.banks_count > 0 ? (
                    <TableDeleteButton
                      handleDelete={() => handleDelete(country.id)}
                    />
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed opacity-50"
                      aria-label={
                        isArabic ? `حذف غير متاح` : "Delete not available"
                      }
                    >
                      <Delete />
                    </button>
                  ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinancingTable;
