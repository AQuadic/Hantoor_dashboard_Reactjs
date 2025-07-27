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

export function BrandsTable() {
  const brands = [
    {
      id: 1,
      image: "/",
      name: "محمد احمد",
      count: 22,
    },
    {
      id: 2,
      image: "/",
      name: "محمد احمد",
      count: 22,
    },
    {
      id: 3,
      image: "/",
      name: "محمد احمد",
      count: 22,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">الصورة</TableHead>
          <TableHead className="text-right">اسم الماركة</TableHead>
          <TableHead className="text-right">عدد السيارات</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand, index) => (
          <TableRow key={brand.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{brand.image}</TableCell>
            <TableCell>{brand.name}</TableCell>
            <TableCell className="w-full">{brand.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
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
