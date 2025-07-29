import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ChatIcon from "../icons/chats/ChatIcon";

const ChatTable = () => {
  const chats = [
    {
      id: 1,
      name: "تويوتا كامري 2025",
      brand: "تويوتا",
      count: 11,
    },
    {
      id: 2,
      name: "تويوتا كامري 2025",
      brand: "تويوتا",
      count: 11,
    },
    {
      id: 3,
      name: "تويوتا كامري 2025",
      brand: "تويوتا",
      count: 11,
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">اسم السيارة</TableHead>
          <TableHead className="text-right">اسم الماركة</TableHead>
          <TableHead className="text-right">المستخدمين داخل المحادثة</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chats.map((chat, index) => (
          <TableRow key={chat.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="">{chat.name}</TableCell>
            <TableCell className="">{chat.brand}</TableCell>
            <TableCell className="w-full">{chat.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
              <Link to={`/chats/${chat.id}`}>
                <ChatIcon />
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
};

export default ChatTable;
