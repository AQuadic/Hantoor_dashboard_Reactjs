import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  getPriceTo,
  PriceTo,
  PriceToResponse,
} from "@/api/models/priceto/getPriceTo";
import { deletePriceTo } from "@/api/models/priceto/deletePriceTo";
import { updatePriceTo } from "@/api/models/priceto/updatePriceTo";

interface PriceToTableProps {
  search?: string;
  page: number;
  dateParams?: { from_date?: string; to_date?: string };
  setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
  countryId?: string | null;
}

export function PriceToTable({
  search = "",
  page,
  setPagination,
  dateParams,
  countryId,
}: PriceToTableProps) {
  const { t, i18n } = useTranslation("models");
  const canEdit = useHasPermission("edit_price_to");

  const { data, isLoading, refetch } = useQuery<PriceToResponse>({
    queryKey: ["priceto", page, search, dateParams, countryId],
    queryFn: () =>
      getPriceTo({ page, search, country_id: countryId, ...dateParams }),
    placeholderData: (previousData: PriceToResponse | undefined) =>
      previousData,
  });

  const priceToList = data?.data ?? [];

  useEffect(() => {
    if (data) {
      setPagination({
        totalPages: data.last_page,
        totalItems: data.total,
        itemsPerPage: data.per_page,
        from: data.from,
        to: data.to,
      });
    }
  }, [data, setPagination]);

  const handleDelete = async (id: number) => {
    await deletePriceTo(id);
    toast.success(t("priceDeleted"));
    refetch();
  };

  const handleToggleStatus = async (id: number, current: number) => {
    try {
      const newStatus = current === 1 ? 0 : 1;
      await updatePriceTo(id, { is_active: newStatus });
      toast.success(
        newStatus === 1 ? t("priceActivated") : t("priceDeactivated")
      );
      refetch();
    } catch {
      toast.error(t("error"));
    }
  };

  if (isLoading) return <Loading />;
  if (!priceToList.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("priceTo")}</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceToList.map((price: PriceTo) => (
          <TableRow key={price.id} noBackgroundColumns={1}>
            <TableCell>{price.id}</TableCell>
            <TableCell>
              {price.name}
              <span className="px-2">
                {price.country?.currency_text
                  ? price.country.currency_text[i18n.language as "ar" | "en"]
                  : ""}
              </span>
            </TableCell>
            <TableCell className="w-full">
              {price.country
                ? price.country.name[i18n.language as "ar" | "en"] || "-"
                : "-"}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={price.is_active === 1}
                onChange={() => handleToggleStatus(price.id, price.is_active)}
              />
              {canEdit && (
                <Link to={`/price-to/edit/${price.id}`}>
                  <Edit />
                </Link>
              )}
              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(price.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
