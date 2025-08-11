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
import { useTranslation } from "react-i18next";

interface Brand {
  id: number;
  name: { ar: string; en: string };
  is_active: number;
  image?: string;
  count?: number;
}

interface BrandsTableProps {
  brands?: Brand[];
}

export function BrandsTable({ brands }: BrandsTableProps) {
  const { t, i18n } = useTranslation("brands");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("brandImage")}</TableHead>
          <TableHead className="text-right">{t("brandName")}</TableHead>
          <TableHead className="text-right">{t("count")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands &&
          brands.map((brand, index) => (
            <TableRow key={brand.id} noBackgroundColumns={1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {/* If brand.image exists, show it, else fallback */}
                {brand.image ? (
                  <img src={brand.image} alt="brand" />
                ) : (
                  <span>{t("noImage")}</span>
                )}
              </TableCell>
              <TableCell>
                {i18n.language === "ar" ? brand.name.ar : brand.name.en}
              </TableCell>
              <TableCell className="w-full">{brand.count ?? "-"}</TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch checked={!!brand.is_active} />
                <Link to={`/brands/${brand.id}`}>
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
