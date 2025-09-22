import { useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";
import { toggleFinancingStatus } from "@/api/financing/toggleFinancingStatus";
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
      await toggleFinancingStatus(country.id, checked);
      toast.dismiss();
      toast.success(
        (t("statusUpdated") as string) ||
          (isArabic ? "تم التحديث" : "Status updated")
      );
      // Invalidate financing queries to refresh the table
      queryClient.invalidateQueries({ queryKey: ["financing"] });
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
      // eslint-disable-next-line no-console
      console.error("Failed to delete financing:", err);
      // Show localized toast error
      toast.error(
        (t("deleteFailed") as string) ||
          (isArabic ? "فشل الحذف" : "Delete failed")
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
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((country, index) => (
          <TableRow key={country.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {isArabic ? country.name.ar : country.name.en}
            </TableCell>
            <TableCell className="w-full">{country.banks_count}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Switch
                isSelected={country.is_active}
                onChange={async (e) => {
                  // Prevent row click navigation when toggling
                  e.stopPropagation();
                  await handleToggleStatus(country, e.target.checked);
                }}
              />
              <div
                className="cursor-pointer"
                onClick={() => handleViewCountry(country)}
              >
                <View />
              </div>
              <div
                className={
                  country.banks_count === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                onClick={(e) => {
                  if (country.banks_count === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {country.banks_count > 0 ? (
                  <TableDeleteButton
                    handleDelete={() => handleDelete(country.id)}
                  />
                ) : (
                  <button disabled className="cursor-not-allowed">
                    <Delete />
                  </button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinancingTable;
