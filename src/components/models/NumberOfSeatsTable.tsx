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
import { useHasPermission } from "@/hooks/usePermissions";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateNumberOfSeats } from "@/api/models/seats/editNumOfSeats";
import NoData from "../general/NoData";

interface NumberOfSeatsTableProps {
  readonly search?: string;
  readonly page?: number;
  readonly dateParams?: {
    readonly from_date?: string;
    readonly to_date?: string;
  };
  readonly setPagination?: (meta: {
    readonly totalPages: number;
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly from: number;
    readonly to: number;
  }) => void;
}

export function NumberOfSeatsTable({
  search = "",
  page = 1,
  dateParams,
  setPagination,
}: NumberOfSeatsTableProps) {
  const { t, i18n } = useTranslation("models");
  const canEdit = useHasPermission("edit_seat_count");
  const canChangeStatus = useHasPermission("change-status_seat_count");

  const {
    data: seats,
    isLoading,
    refetch,
  } = useQuery<numOfSeats[]>({
    queryKey: ["seats", page, search, dateParams],
    queryFn: async () => {
      const r = await getSeatsPaginated({ page, search, ...dateParams });
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

  if (!seats?.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("NOSeats")}</TableHead>
          {(canChangeStatus || canEdit) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {seats?.map((seat) => (
          <TableRow key={seat.id} noBackgroundColumns={1}>
            <TableCell>{seat.id}</TableCell>
            <TableCell className="w-full">
              {(i18n.language === "ar" ? seat.name.ar : seat.name.en).replace(
                /^0+/,
                ""
              )}
            </TableCell>
            {(canChangeStatus || canEdit) && (
              <TableCell className="flex gap-[7px] items-center">
                {canChangeStatus && (
                  <Switch
                    isSelected={!!seat.is_active}
                    onChange={() =>
                      handleToggleStatus(seat.id, !!seat.is_active)
                    }
                  />
                )}
                {canEdit && (
                  <Link to={`/seats/edit/${seat.id}`}>
                    <Edit />
                  </Link>
                )}

                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(seat.id)}
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
