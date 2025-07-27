import { Switch } from "@heroui/react";
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

export function PermissionsTable() {
  const permissions = [
    {
      id: 1,
      name: "مدير",
      managersCount: 12,
      isActive: true,
    },
    {
      id: 2,
      name: "سكرتير",
      managersCount: 29,
      isActive: false,
    },
    {
      id: 3,
      name: "عامل",
      managersCount: 10,
      isActive: true,
    },
    {
      id: 4,
      name: "مسؤول",
      managersCount: 23,
      isActive: false,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">الاسم</TableHead>
          <TableHead className="text-right">عدد المسؤولين</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission, index) => (
          <TableRow key={permission.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-1/10">{permission.name}</TableCell>
            <TableCell className="w-full">{permission.managersCount}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch defaultSelected={permission.isActive} />
              <Link to={`subordinates/permissions/${permission.id}`}>
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
