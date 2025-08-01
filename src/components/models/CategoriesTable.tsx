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

export function CategoriesTable() {
  const previousYearModels = [
    {
      id: 1,
      model: "Extreme 4 Runner",
      status: "Extreme",
      count: "المعدة من 50 عنصر",
    },
    {
      id: 2,
      model: "580 CLE",
      status: "Extreme",
      count: "المعدة من 50 عنصر",
    },
    {
      id: 3,
      model: "300 أبوطان",
      status: "Extreme",
      count: "المعدة من 50 عنصر",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right"> اسم الفئة</TableHead>
          <TableHead className="text-right">النوع</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {previousYearModels.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell className="w-full">{item.status}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
              <Link to={`/categories/${item.id}`}>
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
