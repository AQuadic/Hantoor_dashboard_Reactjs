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
import { Switch } from "@heroui/react";
import brand1 from '/images/brand/brand1.svg'
import brand2 from '/images/brand/brand2.svg'
import brand3 from '/images/brand/brand3.svg'
import brand4 from '/images/brand/brand4.svg'

export function BrandsTable() {
  const brands = [
    {
      id: 1,
      image: brand1,
      name: "محمد احمد",
      count: 22,
    },
    {
      id: 2,
      image: brand2,
      name: "محمد احمد",
      count: 22,
    },
    {
      id: 3,
      image: brand3,
      name: "محمد احمد",
      count: 22,
    },
      {
      id: 3,
      image: brand4,
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
            <TableCell>
              <img src={brand.image} alt="brand" />
            </TableCell>
            <TableCell>{brand.name}</TableCell>
            <TableCell className="w-full">{brand.count}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
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
