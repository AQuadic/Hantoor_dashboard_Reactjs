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

export function NumberOfSeatsTable() {
  const brands = [
    {
      id: 1,
      model: " 2",
      owner: "الشركة الدولية التجارية",
    },
    {
      id: 1,
      model: " 4",
      owner: "الشركة الدولية التجارية",
    },
    {
      id: 1,
      model: " 5",
      owner: "الشركة الدولية التجارية",
    },
  ];

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
        {brands.map((brand, index) => (
          <TableRow key={brand.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{brand.model}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
              <Link to="/brands/1">
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
