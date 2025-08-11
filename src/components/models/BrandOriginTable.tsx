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
import { getBrandOrigin } from "@/api/models/brandOrigin/getBrandOrigin";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface BrandOrigin {
  id: number;
  is_active: boolean;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

export function BrandOriginTable() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const { data } = useQuery<BrandOrigin[]>({
    queryKey: ["brands"],
    queryFn: getBrandOrigin,
    select: (data) =>
      data.map((brand) => ({
        ...brand,
        is_active: Boolean(brand.is_active),
      })),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right"> منشأ الماركة</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((brand, index) => (
          <TableRow key={brand.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">
              {currentLang === "ar" ? brand.name.ar : brand.name.en}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={brand.is_active} />
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
