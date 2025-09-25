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
import { useQuery } from "@tanstack/react-query";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deletePriceFrom } from "@/api/models/pricefrom/deletePriceFrom";
import toast from "react-hot-toast";
import { updatePriceFrom } from "@/api/models/pricefrom/updatePriceFrom";
import { useEffect } from "react";
import {
  getPriceFrom,
  PriceFrom,
  PriceFromResponse,
} from "@/api/models/pricefrom/getPriceFrom";

interface PriceFromTableProps {
  search?: string;
  page: number;
  countryId?: string | null;
  dateParams?: { from_date?: string; to_date?: string };
  setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function PriceFromTable({
  search = "",
  page,
  setPagination,
  countryId,
  dateParams,
}: PriceFromTableProps) {
  const { t, i18n } = useTranslation("models");

  const { data, isLoading, refetch } = useQuery<PriceFromResponse>({
    queryKey: ["pricefrom", page, search, countryId, dateParams],
    queryFn: () =>
      getPriceFrom({
        page,
        search,
        country_id: countryId ? Number(countryId) : undefined,
        ...dateParams,
      }),
  });

  const priceFromList = data?.data ?? [];

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
    await deletePriceFrom(id);
    toast.success(t("priceDeleted"));
    refetch();
  };

  const handleToggleStatus = async (id: number, current: number) => {
    try {
      const newStatus = current === 1 ? 0 : 1;
      await updatePriceFrom(id, { is_active: newStatus });
      toast.success(
        newStatus === 1 ? t("priceActivated") : t("priceDeactivated")
      );
      refetch();
    } catch {
      toast.error(t("error"));
    }
  };

  if (isLoading) return <Loading />;
  if (!priceFromList.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("priceFrom")}</TableHead>
          <TableHead className="text-right">{t("country")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceFromList.map((price: PriceFrom, index: number) => (
          <TableRow key={price.id} noBackgroundColumns={1}>
            <TableCell>{data ? data.from + index : index + 1}</TableCell>
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
              <Link to={`/price-from/edit/${price.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(price.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
