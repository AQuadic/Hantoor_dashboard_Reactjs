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

export function NumberOfSeatsTable() {
  const { data: seats, isLoading, error } = useQuery<numOfSeats[]>({
    queryKey: ["seats"],
    queryFn: getSeats,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading seats.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right"> عدد المقاعد</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
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
                <TableDeleteButton handleDelete={() => {}} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
