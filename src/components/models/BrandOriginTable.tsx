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
import { deleteBrandOrigin } from "@/api/models/brandOrigin/deleteBrandOrigin";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

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

interface BrandOriginTableProps {
  search?: string;
}

export function BrandOriginTable({ search = "" }: BrandOriginTableProps) {
  const { i18n, t } = useTranslation("models");
  const currentLang = i18n.language;

  const { data, isLoading, refetch } = useQuery<BrandOrigin[]>({
    queryKey: ["brands"],
    queryFn: getBrandOrigin,
  });

  const handleDelete = async (id: number) => {
    await deleteBrandOrigin(id);
    toast.success(t("brandOriginDeleted"));
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  const filtered = data?.filter((brand) => {
    const name = currentLang === "ar" ? brand.name.ar : brand.name.en;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("brandOrigin")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered?.map((brand, index) => (
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
