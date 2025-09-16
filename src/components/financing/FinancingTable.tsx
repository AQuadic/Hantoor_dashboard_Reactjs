import { useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useQueryClient } from "@tanstack/react-query";
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";
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
  if (!data || data.length === 0)
    return (
      <div className="py-8 text-center text-gray-500">
        {isArabic ? "لا توجد بيانات" : "No data"}
      </div>
    );

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
          <TableRow
            key={country.id}
            noBackgroundColumns={1}
            className="cursor-pointer"
            onClick={() => handleViewCountry(country)}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {isArabic ? country.name.ar : country.name.en}
            </TableCell>
            <TableCell className="w-full">{country.banks_count}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Switch defaultSelected={country.is_active} />
              <div
                className="cursor-pointer"
                onClick={() => handleViewCountry(country)}
              >
                <View />
              </div>
              {country.banks_count > 0 && (
                <div>
                  <TableDeleteButton
                    handleDelete={() => handleDelete(country.id)}
                  />
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinancingTable;
