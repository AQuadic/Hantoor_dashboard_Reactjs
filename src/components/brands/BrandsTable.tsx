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

interface BrandImage {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: unknown[];
  custom_properties: unknown[];
  generated_conversions: unknown[];
  responsive_images: unknown[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

interface Brand {
  id: number;
  name: { ar: string; en: string };
  is_active: number;
  image?: BrandImage;
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
                {/* If brand.image.original_url exists, show it, else fallback */}
                {brand.image && brand.image.original_url ? (
                  (() => {
                    // Clean double slashes in URL
                    const url = brand.image.original_url.replace(
                      /([^:]\/)\/+/,
                      "$1/"
                    );
                    console.log("Brand image URL:", url);
                    return (
                      <img
                        src={url}
                        alt="brand"
                        style={{ maxWidth: 60, maxHeight: 40 }}
                      />
                    );
                  })()
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
