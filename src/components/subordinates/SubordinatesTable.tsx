import { Switch } from "@heroui/react";
import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function SubordinatesTable() {
  const subordinates = [
    {
      id: 1,
      image: "",
      name: "محمد احمد",
      mobile: "+966 123456 789",
      email: "username@mail.com",
      creationDate: "22/03/2024- 08:30 PM",
      authority: "مدير",
      lastLogin: "22/03/2024- 08:30 PM",
      isActive: true,
    },
    {
      id: 2,
      image: "",
      name: "مصطفى خالد",
      mobile: "+966 123456 789",
      email: "username@mail.com",
      creationDate: "22/03/2024- 08:30 PM",
      authority: "سكرتير",
      lastLogin: "22/03/2024- 08:30 PM",
      isActive: false,
    },
    {
      id: 3,
      image: "",
      name: "إبراهيم محمود",
      mobile: "+966 123456 789",
      email: "username@mail.com",
      creationDate: "22/03/2024- 08:30 PM",
      authority: "عامل",
      lastLogin: "22/03/2024- 08:30 PM",
      isActive: true,
    },
    {
      id: 4,
      image: "",
      name: "محمد احمد",
      mobile: "+966 123456 789",
      email: "username@mail.com",
      creationDate: "22/03/2024- 08:30 PM",
      authority: "مسؤول",
      lastLogin: "22/03/2024- 08:30 PM",
      isActive: false,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">الصورة</TableHead>
          <TableHead className="text-right">الاسم</TableHead>
          <TableHead className="text-right">رقم الجوال</TableHead>
          <TableHead className="text-right">البريد الإلكتروني</TableHead>
          <TableHead className="text-right">تاريخ ووقت الإنشاء</TableHead>
          <TableHead className="text-right">المصلحية</TableHead>
          <TableHead className="text-right">آخر تسجيل دخول</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subordinates.map((subordinate, index) => (
          <TableRow key={subordinate.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img
                src={subordinate.image}
                alt={subordinate.name}
                className="object-cover w-10 h-10 rounded-full"
              />
            </TableCell>
            <TableCell>{subordinate.name}</TableCell>
            <TableCell>{subordinate.mobile}</TableCell>
            <TableCell>{subordinate.email}</TableCell>
            <TableCell>{subordinate.creationDate}</TableCell>
            <TableCell>{subordinate.authority}</TableCell>
            <TableCell className="w-full">{subordinate.lastLogin}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
              <Link to={`/subordinates/${subordinate.id}`}>
                <Edit />
              </Link>
              <Link to={`/subordinates/change_password/${subordinate.id}`}>
                <Password />
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
