import { Link } from "react-router";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch } from "@heroui/react";
import user1 from '/images/users/user1.svg'
import user2 from '/images/users/user2.svg'
import user3 from '/images/users/user3.svg'
import user4 from '/images/users/user4.svg'

export function UserTable() {
  const users = [
    { id: 1, image: user1, name: "محمد احمد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"رقم الجوال", country: "الامارات",  email: "asmaa@example.com", advancedCount: "22", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 2, image: user2, name: "مصطفي خالد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"فيس بوك", country: "مصر",  email: "john@example.com", advancedCount: "14", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 3, image: user3, name: "ابراهيم محمود", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"جيميل", country: "الامارات",  email: "jane@example.com", advancedCount: "8", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 4, image: user4, name: "محمد احمد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"البريد الالكتروني", country: "المغرب",  email: "jane@example.com", advancedCount: "11", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">الصورة</TableHead>
          <TableHead className="text-right">الاسم</TableHead>
          <TableHead className="text-right">رقم الجوال</TableHead>
          <TableHead className="text-right">البريد الالكتروني</TableHead>
          <TableHead className="text-right">تاريخ ووقت التسجيل</TableHead>
          <TableHead className="text-right">طريقة التسجيل</TableHead>
          <TableHead className="text-right">الدولة</TableHead>
          <TableHead className="text-right">عدد مرات البحث المتقدم</TableHead>
          <TableHead className="text-right">طريقة الدفع</TableHead>
          <TableHead className="text-right">عدد مرات طلب تفاصيل سعر التأمين</TableHead>
          <TableHead className="text-right">عدد السيارات في المفضلة</TableHead>
          <TableHead className="text-right">العملة</TableHead>
          <TableHead className="text-right">نشط منذ</TableHead>
          <TableHead className="text-right">مدة الايقاف</TableHead>
          <TableHead className="text-right">الحالة</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img src={user.image} alt="user" className="w-[52.3px] h-[51px] rounded-full" />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.date}</TableCell>
            <TableCell>{user.way}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.advancedCount}</TableCell>
            <TableCell>{user.paymentMethod}</TableCell>
            <TableCell>{user.noTimes}</TableCell>
            <TableCell>{user.noCars}</TableCell>
            <TableCell>{user.currency}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.SuspensionPeriod}</TableCell>
            <TableCell className="flex gap-[7px]">
                <Switch />
              <Link to='/users/edit'><Edit /></Link>
              <Link to='change-password'><Password /></Link>
              <TableDeleteButton handleDelete={() => {}} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
