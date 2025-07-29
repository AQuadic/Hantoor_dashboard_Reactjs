import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function CategoriesTable() {
  const previousYearModels = [
    {
      id: 1,
      model: "Extreme 4 Runner",
      status: "1",
      count: "المعدة من 50 عنصر",
    },
    {
      id: 2,
      model: "580 CLE",
      status: "2",
      count: "المعدة من 50 عنصر",
    },
    {
      id: 3,
      model: "300 أبوطان",
      status: "3",
      count: "المعدة من 50 عنصر",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">السنة السابقة</TableHead>
          <TableHead className="text-right">الأوضاع</TableHead>
          <TableHead className="text-right">العدد</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {previousYearModels.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
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
