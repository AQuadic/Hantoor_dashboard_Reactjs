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
import admin1 from '/images/admin/admin1.svg'
import admin2 from '/images/admin/admin2.svg'
import admin3 from '/images/admin/admin3.svg'
import admin4 from '/images/admin/admin4.svg'

export function SubordinatesTable() {
  const subordinates = [
    {
      id: 1,
      image: admin1,
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
      image: admin2,
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
      image: admin3,
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
      image: admin4,
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
              <img src={subordinate.image} alt="admin" />
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
