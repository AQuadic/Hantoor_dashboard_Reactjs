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
import {
  getBrandOriginPaginated,
  BrandOrigin as BrandOriginType,
} from "@/api/models/brandOrigin/getBrandOrigin";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteBrandOrigin } from "@/api/models/brandOrigin/deleteBrandOrigin";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateBrandOrigin } from "@/api/models/brandOrigin/editBrandOrigin";
import NoData from "../general/NoData";

interface BrandOriginTableProps {
  search?: string;
  page?: number;
  dateParams?: { from_date?: string; to_date?: string };
  setPagination?: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function BrandOriginTable({
  search = "",
  page = 1,
  setPagination,
  dateParams,
}: BrandOriginTableProps) {
  const { i18n, t } = useTranslation("models");
  const currentLang = i18n.language;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["brandOrigins", page, search, dateParams], 
    queryFn: async () => {
      const r = await getBrandOriginPaginated({ page, search, ...dateParams });

      if (setPagination) {
        const total = r.total ?? 0;
        const per_page = r.per_page ?? (r.data?.length || 10);
        const totalPages = per_page ? Math.ceil(total / per_page) : 1;
        setPagination({
          totalPages,
          totalItems: total,
          itemsPerPage: per_page,
          from: r.from ?? 0,
          to: r.to ?? r.data?.length ?? 0,
        });
      }

      return r.data;
    },
  });
  const handleDelete = async (id: number) => {
    await deleteBrandOrigin(id);
    toast.success(t("brandOriginDeleted"));
    refetch();
  };

  const handleToggle = async (id: number, current: boolean) => {
    try {
      await updateBrandOrigin(id, { is_active: !current });
      toast.success(!current ? t("brandOriginActivated") : t("brandOriginDeactivated"));
      refetch();
    } catch (error) {
      toast.error(t("errorOccurred"));
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) return <NoData />;

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
              <Switch
                isSelected={brand.is_active}
                onChange={() => handleToggle(brand.id, brand.is_active)}
              />
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
