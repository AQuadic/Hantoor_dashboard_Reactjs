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
import { getSeats, numOfSeats } from "@/api/models/seats/getSeats";
import { useQuery } from "@tanstack/react-query";
import { deleteSeats } from "@/api/models/seats/deleteSeats";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

interface NumberOfSeatsTableProps {
  search?: string;
}

export function NumberOfSeatsTable({ search = "" }: NumberOfSeatsTableProps) {
  const { t, i18n } = useTranslation("models");
  const {
    data: seats,
    isLoading,
    refetch,
  } = useQuery<numOfSeats[]>({
    queryKey: ["seats"],
    queryFn: getSeats,
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

  if (isLoading) {
    return <Loading />;
  }

  const filtered = seats?.filter((seat) => {
    const name = (i18n.language === "ar" ? seat.name.ar : seat.name.en).replace(
      /^0+/,
      ""
    );
    return name.toLowerCase().includes(search.toLowerCase());
  });

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
        {filtered?.map((seat, index) => (
          <TableRow key={seat.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">
              {(i18n.language === "ar" ? seat.name.ar : seat.name.en).replace(
                /^0+/,
                ""
              )}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={seat.is_active} />
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
