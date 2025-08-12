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

export function NumberOfSeatsTable() {
    const { t } = useTranslation("models");
  const { data: seats, refetch } = useQuery<numOfSeats[]>({
    queryKey: ["seats"],
    queryFn: getSeats,
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteSeats(id);
      toast.success(t("seatDeletedSuccessfully"));
      refetch();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        t("somethingWentWrong");
      toast.error(errorMsg);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('NOSeats')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seats?.map((seat, index) => (
          <TableRow key={seat.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{seat.name.ar}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={seat.is_active} />
              <Link to={`/seats/edit/${seat.id}`}>
                <Edit />
              </Link>

              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(seat.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
