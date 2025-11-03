import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import Edit from "@/components/icons/general/Edit";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useHasPermission } from "@/hooks/usePermissions";
import { FinancingItem } from "@/api/financing/fetchFinancing";
import { getCountries, Country } from "@/api/countries/getCountry";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";
import { updateRequestFinancing } from "@/api/financing/editFinancing";

interface InsuranceTableProps {
  selectedCountry: string | null;
  financingItems: FinancingItem[];
  isLoading: boolean;
  refetch: () => void;
}

const InsuranceTable = ({
  selectedCountry,
  financingItems,
  isLoading,
  refetch,
}: InsuranceTableProps) => {
  const { t, i18n } = useTranslation("setting");

  const canChangeStatus = useHasPermission("change-status_request_financing");
  const canEdit = useHasPermission("edit_request_financing");
  const canDelete = useHasPermission("delete_request_financing");

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });

  const countries: Country[] = countriesData?.data ?? [];

  const getCountryName = (id: number) => {
    const country = countries.find((c) => c.id === id);
    if (!country) return "-";
    return i18n.language === "ar" ? country.name.ar : country.name.en;
  };

  const handleDelete = async (id: number) => {
    await deleteFinancing(id);
    toast.success(t("deletedSuccessfully"));
    refetch();
  };

  const handleToggle = async (item: FinancingItem) => {
    const prevState = item.is_active;
    try {
      const newState = !item.is_active;
      item.is_active = newState;

      await updateRequestFinancing({
        id: item.id,
        phone: item.phone,
        country_id: item.country_id,
        is_active: newState,
      });

      toast.success(t("statusUpdated") || "Status updated");
      refetch();
    } catch (err) {
      item.is_active = prevState;
      toast.error(t("somethingWentWrong") || "Failed to update status");
      console.error(err);
    }
  };

  if (isLoading) return <Loading />;

  // If the page-level filtering by country was not performed on server side,
  // still support client-side filter when `selectedCountry` is set (keeps behavior compatible)
  const filteredItems =
    selectedCountry && selectedCountry !== "all"
      ? financingItems.filter(
          (item) => String(item.country_id) === selectedCountry
        )
      : financingItems;

  if (!filteredItems || filteredItems.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("whatsappNumber")}</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          {(canChangeStatus || canEdit || canDelete) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredItems.map((item) => (
          <TableRow key={item.id} noBackgroundColumns={1}>
            <TableCell>{item.id}</TableCell>
            <TableCell dir="ltr">{item.phone}</TableCell>
            <TableCell className="w-full">
              {getCountryName(item.country_id)}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              {canChangeStatus && (
                <Switch
                  isSelected={!!item.is_active}
                  onChange={() => handleToggle(item)}
                />
              )}

              {canEdit && (
                <Link to={`/setting/edit-whatsapp/${item.id}`}>
                  <Edit />
                </Link>
              )}

              {canDelete && (
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(item.id)}
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

export default InsuranceTable;
