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
import { deleteBrands } from "@/api/brand/deleteBrands";
import toast from "react-hot-toast";

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
  url?: string;
  responsive_urls?: string[];
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
  refetch: () => void;
}

export function BrandsTable({ brands, refetch }: BrandsTableProps) {
  const { t, i18n } = useTranslation("brands");

  const handleDelete = async (id: number) => {
    await deleteBrands(id);
    toast.success(t('brandDeletedsuccessfully'))
    refetch();
  };

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
                {brand.image &&
                (brand.image.url ||
                  (brand.image.responsive_urls &&
                    brand.image.responsive_urls[0])) ? (
                  (() => {
                    const rawUrl =
                      brand.image.url ||
                      (Array.isArray(brand.image.responsive_urls)
                        ? brand.image.responsive_urls[0]
                        : undefined);
                    if (!rawUrl) return <span>{t("noImage")}</span>;
                    const url = rawUrl.replace(/([^:]\/)\/+/, "$1/");
                    return (
                      <img
                        src={url}
                        alt="brand"
                        className="w-10 h-10 rounded-full object-cover"
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
                <Switch isSelected={brand.is_active === 1} />
                <Link to={`/brands/${brand.id}`}>
                  <Edit />
                </Link>
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(brand.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
