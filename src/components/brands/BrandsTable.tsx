import React from "react";
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
import { useHasPermission } from "@/hooks/usePermissions";
import { deleteBrands } from "@/api/brand/deleteBrands";
import { updateBrand } from "@/api/brand/updateBrand";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import TableImagePlaceholder from "../general/TableImagePlaceholder";

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
  is_active: boolean | number;
  image?: BrandImage;
  count?: number;
  vehicles_count?: number;
}

interface BrandsTableProps {
  brands?: Brand[];
  refetch: () => void;
  isLoading?: boolean;
}

export function BrandsTable({
  brands,
  refetch,
  isLoading,
}: Readonly<BrandsTableProps>) {
  const canEdit = useHasPermission("edit_brand");
  const { t, i18n } = useTranslation("brands");
  const [updatingId, setUpdatingId] = React.useState<number | null>(null);
  const [localBrands, setLocalBrands] = React.useState<Brand[] | undefined>(
    brands
  );

  React.useEffect(() => {
    setLocalBrands(brands);
  }, [brands]);

  const handleDelete = async (id: number) => {
    await deleteBrands(id);
    toast.success(t("brandDeletedsuccessfully"));
    refetch();
  };

  const handleToggleActive = async (brand: Brand) => {
    setUpdatingId(brand.id);
    const currentActive = Boolean(brand.is_active);
    const newActive = !currentActive;
    // Optimistically update UI
    setLocalBrands((prev) =>
      prev?.map((b) => (b.id === brand.id ? { ...b, is_active: newActive } : b))
    );
    try {
      await updateBrand({
        id: brand.id,
        // send boolean value true/false
        is_active: newActive,
      });
      toast.success(
        currentActive ? t("brandDeactivated") : t("brandActivated")
      );
      refetch();
    } catch {
      // Revert UI on error
      setLocalBrands((prev) =>
        prev?.map((b) =>
          b.id === brand.id ? { ...b, is_active: currentActive } : b
        )
      );
      toast.error(t("brandStatusUpdateFailed"));
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <Loading />;
  if (!brands || brands.length === 0) return <NoData />;

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
        {localBrands &&
          localBrands.map((brand) => (
            <TableRow key={brand.id} noBackgroundColumns={1}>
              <TableCell>{brand.id}</TableCell>
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
                    const url = rawUrl.replace(/([^:]\/)\/+/g, "$1/");
                    return (
                      <img
                        src={url}
                        alt="brand"
                        className="w-[48px] h-[48px] rounded-lg object-cover"
                      />
                    );
                  })()
                ) : (
                  <TableImagePlaceholder className="w-[48px] h-[48px]" />
                )}
              </TableCell>
              <TableCell>
                {i18n.language === "ar" ? brand.name.ar : brand.name.en}
              </TableCell>
              <TableCell className="w-full">
                {brand.vehicles_count ?? "-"}
              </TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={Boolean(brand.is_active)}
                  isDisabled={updatingId === brand.id}
                  onChange={() => handleToggleActive(brand)}
                />
                {canEdit && (
                  <Link to={`/brands/${brand.id}`}>
                    <Edit />
                  </Link>
                )}
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
