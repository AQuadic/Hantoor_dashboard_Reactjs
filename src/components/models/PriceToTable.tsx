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
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getPriceTo, PriceToResponse } from "@/api/models/priceto/getPriceTo";
import { deletePriceTo } from "@/api/models/priceto/deletePriceTo";
import { updatePriceTo } from "@/api/models/priceto/updatePriceTo";

interface PriceToTableProps {
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

export function PriceToTable({
  search = "",
  page,
  setPagination,
}: PriceToTableProps) {
  const { t } = useTranslation("models");

  const { data, isLoading, refetch } = useQuery<PriceToResponse>({
    queryKey: ["priceto", page, search],
    queryFn: () => getPriceTo({ page, search }),
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
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceToList.map(
          (
            price: { id: number; name: string; is_active: number },
            index: number
          ) => (
            <TableRow key={price.id} noBackgroundColumns={1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="w-full">{price.name}</TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={price.is_active === 1}
                  onChange={() => handleToggleStatus(price.id, price.is_active)}
                />
                <Link to={`/price-to/edit/${price.id}`}>
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
