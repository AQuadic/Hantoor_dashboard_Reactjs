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

export function BrandOriginTable() {
  const brandOrigins = [
    {
      id: 1,
      origin: "أوروبا",
      count: "3 من 5% عنصر",
    },
    {
      id: 2,
      origin: "السين",
      count: "3 من 5% عنصر",
    },
    {
      id: 3,
      origin: "كوريا",
      count: "3 من 5% عنصر",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">صفاءة المفرقة</TableHead>
          <TableHead className="text-right">المعدل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brandOrigins.map((brand, index) => (
          <TableRow key={brand.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{brand.origin}</TableCell>
            <TableCell>{brand.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <ActiveStatus />
              <Link to={`/brand-origins/${brand.id}`}>
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
