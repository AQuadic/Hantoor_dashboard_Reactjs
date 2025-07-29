import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function CarTypesTable() {
  const carTypes = [
    {
      id: 1,
      type: "SUV",
      model: "Extreme",
      count: "3 من 50",
    },
    {
      id: 2,
      type: "سيدان",
      model: "560",
      count: "3 من 50",
    },
    {
      id: 3,
      type: "كوبية",
      model: "300",
      count: "3 من 50",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">الفصل</TableHead>
          <TableHead className="text-right">النوع</TableHead>
          <TableHead className="text-right">العدد</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carTypes.map((car, index) => (
          <TableRow key={car.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{car.type}</TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell className={"w-full"}>{car.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
              <Link to={`/car-types/${car.id}`}>
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
