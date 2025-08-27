import { useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
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
import { FinancingCountry } from "@/api/financing/getFinancing";

interface FinancingTableProps {
  data: FinancingCountry[];
  isLoading: boolean;
  error: Error | null;
}

const FinancingTable = ({ data, isLoading, error }: FinancingTableProps) => {
  const { t, i18n } = useTranslation("financing");
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const handleDelete = (id: number) => {
    // TODO: Implement delete functionality
    console.log("Delete country:", id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">
          {isArabic ? "جاري التحميل..." : "Loading..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500 text-lg">
          {isArabic ? "حدث خطأ في تحميل البيانات" : "Error loading data"}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500 text-lg">
          {isArabic ? "لا توجد بيانات" : "No data available"}
        </div>
      </div>
    );
  }

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
            <TableCell
              className="flex gap-[7px] items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Switch defaultSelected={country.is_active} />
              <div
                onClick={() =>
                  navigate(`/financing/details/${country.id}`, {
                    state: {
                      country: isArabic ? country.name.ar : country.name.en,
                    },
                  })
                }
                className="cursor-pointer"
              >
                <View />
              </div>
              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(country.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinancingTable;
