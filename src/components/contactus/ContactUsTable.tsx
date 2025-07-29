import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import View from "../icons/general/View";
import { Link } from "react-router";
import Email from "../icons/contactus/Email";
import Star from "../icons/contactus/Star";

const ContactUsTable = () => {
  const supportMessages = [
    {
      id: 1,
      name: "مصطفي محمد",
      number: "6881066",
      email: "username@mail.com",
      country: "الامارات",
      phone: "+966 123456 789",
    },
    {
      id: 2,
      name: "مصطفي محمد",
      number: "6881066",
      email: "username@mail.com",
      country: "الامارات",
      phone: "+966 123456 789",
    },
    {
      id: 3,
      name: "مصطفي محمد",
      number: "6881066",
      email: "username@mail.com",
      country: "الامارات",
      phone: "+966 123456 789",
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">اسم العميل</TableHead>
          <TableHead className="text-right">رقم الجوال</TableHead>
          <TableHead className="text-right">البريد الالكتروني</TableHead>
          <TableHead className="text-right">البلد</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {supportMessages.map((message, index) => (
          <TableRow key={message.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{message.name}</TableCell>
            <TableCell>{message.phone}</TableCell>
            <TableCell>{message.email}</TableCell>
            <TableCell className="w-full">{message.country}</TableCell>
            <TableCell
              className="flex gap-[7px] items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-[10px] w-[160px] h-[37px] bg-[#1E1B1B] rounded-[8.15px]">
                <Email />
                <button className=" text-[#FFFFFF] font-bold text-sm">
                  الرد عن طريق البريد
                </button>
              </div>
              <Link to="/contact-us/view">
                <View />
              </Link>
              <Star />
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => {}} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactUsTable;
