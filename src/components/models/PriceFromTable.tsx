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
import {
  getPriceFrom,
  PriceFromResponse,
} from "@/api/models/priceFrom/getPriceFrom";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deletePriceFrom } from "@/api/models/priceFrom/deletePriceFrom";
import toast from "react-hot-toast";
import { updatePriceFrom } from "@/api/models/priceFrom/updatePriceFrom";
import { useEffect } from "react";

interface PriceFromTableProps {
  search?: string;
  page: number;
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
}: PriceFromTableProps) {
  const { t } = useTranslation("models");

  const { data, isLoading, refetch } = useQuery<PriceFromResponse>({
    queryKey: ["pricefrom", page, search],
    queryFn: () => getPriceFrom({ page, search }),
    placeholderData: (previousData: PriceFromResponse | undefined) =>
      previousData,
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
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceFromList.map(
          (
            price: { id: number; name: string; is_active: number },
            index: number
          ) => (
            <TableRow key={price.id} noBackgroundColumns={1}>
              <TableCell>{data ? data.from + index : index + 1}</TableCell>
              <TableCell className="w-full">{price.name}</TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={price.is_active === 1}
                  onChange={() => handleToggleStatus(price.id, price.is_active)}
                />
                <Link to={`/price-from/edit/${price.id}`}>
                  <Edit />
                </Link>

                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(price.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
