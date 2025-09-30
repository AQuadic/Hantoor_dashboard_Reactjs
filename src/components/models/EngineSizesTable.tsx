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
import { useQuery } from "@tanstack/react-query";
import {
  EngineSize,
  getEngineSizePaginated,
} from "@/api/models/engineSize/getEnginSize";
import { deleteEngineSize } from "@/api/models/engineSize/deleteEngineSize";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateEngineSize } from "@/api/models/engineSize/editEngineSize";
import NoData from "../general/NoData";

interface EngineSizesTableProps {
  readonly search?: string;
  readonly page?: number;
  readonly dateParams?: {
    readonly from_date?: string;
    readonly to_date?: string;
  };
  readonly setPagination?: (meta: {
    readonly totalPages: number;
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly from: number;
    readonly to: number;
  }) => void;
}

export function EngineSizesTable({
  search = "",
  page = 1,
  dateParams,
  setPagination,
}: EngineSizesTableProps) {
  const { t, i18n } = useTranslation("models");
  const canEdit = useHasPermission("edit_engine_size");
  const {
    data: engineSize,
    isLoading,
    refetch,
  } = useQuery<EngineSize[]>({
    queryKey: ["engineSize", page, search, dateParams],
    queryFn: async () => {
      const r = await getEngineSizePaginated({ page, search, ...dateParams });
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
    await deleteEngineSize(id);
    toast.success(t("engineSizeDeleted"));
    refetch();
  };

  const handleToggleStatus = async (id: number, current: boolean) => {
    try {
      await updateEngineSize(id, { is_active: !current });
      toast.success(
        !current ? t("engineSizeActivated") : t("engineSizeDeactivated")
      );
      refetch();
    } catch {
      toast.error(t("error"));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!engineSize?.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("engineSize")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineSize?.map((engine, index) => (
          <TableRow key={engine.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">
              {i18n.language === "ar"
                ? engine.name.ar.slice(0, 7)
                : engine.name.en.slice(0, 7)}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={engine.is_active}
                onChange={() => handleToggleStatus(engine.id, engine.is_active)}
              />
              {canEdit && (
                <Link to={`/engine-size/edit/${engine.id}`}>
                  <Edit />
                </Link>
              )}

              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(engine.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
