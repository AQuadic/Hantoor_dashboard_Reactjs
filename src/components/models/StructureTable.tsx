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

export function StructureTable() {
  const data = [
    {
      id: 1,
      type: "SUV",
      model: "2025",
      isActive: true,
    },
    {
      id: 2,
      type: "سيدان",
      model: "2024",
      isActive: true,
    },
    {
      id: 3,
      type: "كوبيه",
      model: "2025",
      isActive: false,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">نوع الهيكل</TableHead>
          <TableHead className="text-right">الموديل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell className="w-full">{item.model}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
            <Link to={`/structure-types/edit/${item.id}`}>
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
