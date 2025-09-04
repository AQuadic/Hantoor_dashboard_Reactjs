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
import { getPriceFrom, PriceFrom } from "@/api/models/pricefrom/getPriceFrom";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deletePriceFrom } from "@/api/models/pricefrom/deletePriceFrom";
import toast from "react-hot-toast";
import { updatePriceFrom } from "@/api/models/pricefrom/updatePriceFrom";

interface PriceFromTableProps {
  search?: string;
}

export function PriceFromTable({ search = "" }: PriceFromTableProps) {
  const { t } = useTranslation("models");

  const { data, isLoading, refetch } = useQuery<PriceFrom[]>({
    queryKey: ["pricefrom"],
    queryFn: () => getPriceFrom({ pagination: false }),
  });

  const priceFromList: PriceFrom[] = data ?? [];

  const filtered = priceFromList.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

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

  if (isLoading) return <Loading />
  if (!data) return <NoData />


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
        {filtered.map((price, index) => (
          <TableRow key={price.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
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
                <TableDeleteButton handleDelete={() => handleDelete(price.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
