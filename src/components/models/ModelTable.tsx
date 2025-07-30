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

export function ModelTable() {
  const brands = [
    {
      id: 1,
      model: " 2024",
      owner: "الشركة الدولية التجارية",
    },
    {
      id: 1,
      model: " 2024",
      owner: "الشركة الدولية التجارية",
    },
    {
      id: 1,
      model: " 2024",
      owner: "الشركة الدولية التجارية",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right"> الموديل</TableHead>
          <TableHead className="text-right"> الوكيل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand, index) => (
          <TableRow key={brand.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{brand.model}</TableCell>
            <TableCell className="w-full">{brand.owner}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
              <Link to={`/models/edit/${brand.id}`}>
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
