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

export function EngineTypesTable() {
  const brands = [
    {
      id: 1,
      model: " بنزين",
    },
    {
      id: 1,
      model: " ديزل",
    },
    {
      id: 1,
      model: " كهرباء",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right"> نوع الماكينة</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand, index) => (
          <TableRow key={brand.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{brand.model}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
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
