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
import { getSeatsPaginated, numOfSeats } from "@/api/models/seats/getSeats";
import { useQuery } from "@tanstack/react-query";
import { deleteSeats } from "@/api/models/seats/deleteSeats";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateNumberOfSeats } from "@/api/models/seats/editNumOfSeats";

interface NumberOfSeatsTableProps {
  search?: string;
  page?: number;
  setPagination?: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function NumberOfSeatsTable({
  search = "",
  page = 1,
  setPagination,
}: NumberOfSeatsTableProps) {
  const { t, i18n } = useTranslation("models");
  const {
    data: seats,
    isLoading,
    refetch,
  } = useQuery<numOfSeats[]>({
    queryKey: ["seats", page, search],
    queryFn: async () => {
      const r = await getSeatsPaginated({ page, search });
      if (setPagination) {
        const total = r.total ?? 0;
        const per_page = r.per_page ?? (r.data?.length || 10);
        const totalPages = per_page ? Math.ceil(total / per_page) : 1;
        setPagination({
          totalPages,
          totalItems: total,
          itemsPerPage: per_page,
          from: r.from ?? 0,
          to: r.to ?? r.data?.length ?? 0,
        });
      }
      return r.data;
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteSeats(id);
      toast.success(t("seatDeletedSuccessfully"));
      refetch();
    } catch (error: unknown) {
      let errorMsg = t("somethingWentWrong");
      if (typeof error === "object" && error !== null) {
        // @ts-expect-error: error may have response/message properties from axios or JS Error
        errorMsg = error?.response?.data?.message || error?.message || errorMsg;
      }
      toast.error(errorMsg);
    }
  };

  const handleToggleStatus = async (id: number, current: boolean) => {
    try {
      await updateNumberOfSeats(id, { is_active: !current });
      toast.success(!current ? t("seatActivated") : t("seatDeactivated"));
      refetch();
    } catch (error: unknown) {
      let errorMsg = t("somethingWentWrong");
      if (typeof error === "object" && error !== null) {
        // @ts-expect-error: error may have response/message properties from axios or JS Error
        errorMsg = error?.response?.data?.message || error?.message || errorMsg;
      }
      toast.error(errorMsg);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("NOSeats")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seats?.map((seat, index) => (
          <TableRow key={seat.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">
              {(i18n.language === "ar" ? seat.name.ar : seat.name.en).replace(
                /^0+/,
                ""
              )}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={!!seat.is_active}
                onChange={() => handleToggleStatus(seat.id, !!seat.is_active)}
              />
              <Link to={`/seats/edit/${seat.id}`}>
                <Edit />
              </Link>

              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(seat.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
