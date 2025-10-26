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
  EngineType,
  getEngineTypePaginated,
} from "@/api/models/engineTypes/getEngineType";
import { deleteEngineType } from "@/api/models/engineTypes/deleteEngineType";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "@/hooks/usePermissions";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import { updateEngineType } from "@/api/models/engineTypes/editEngineType";
import NoData from "../general/NoData";

interface EngineTypesTableProps {
  readonly search?: string;
  readonly page?: number;
  readonly dateParams?: {
    readonly from_date?: string;
    readonly to_date?: string;
  }; // <-- add date filter
  readonly setPagination?: (meta: {
    readonly totalPages: number;
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly from: number;
    readonly to: number;
  }) => void;
}

export function EngineTypesTable({
  search = "",
  page = 1,
  setPagination,
  dateParams,
}: EngineTypesTableProps) {
  const { t } = useTranslation("models");
  const canEdit = useHasPermission("edit_engine_type");
  const canChangeStatus = useHasPermission("change-status_engine_type");
  const {
    data: engineTypes,
    isLoading,
    refetch,
  } = useQuery<EngineType[]>({
    queryKey: ["engineTypes", page, search, dateParams],
    queryFn: async () => {
      const r = await getEngineTypePaginated({
        pagination: "normal",
        page,
        per_page: 15,
        search,
        ...dateParams,
      });
      if (setPagination) {
        const total = r.total ?? 0;
        const per_page = r.per_page ?? 15;
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
    await deleteEngineType(id);
    toast.success(t("engineTypeDeleted"));
    refetch();
  };

  const handleToggleStatus = async (id: number, current: boolean) => {
    try {
      await updateEngineType(id, { is_active: !current });
      toast.success(
        !current ? t("engineTypeActivated") : t("engineTypeDeactivated")
      );
      refetch();
    } catch (error) {
      toast.error(t("somethingWentWrong"));
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!engineTypes?.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("engineType")}</TableHead>
          {(canChangeStatus || canEdit) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineTypes?.map((engine) => (
          <TableRow key={engine.id} noBackgroundColumns={1}>
            <TableCell>{engine.id}</TableCell>
            <TableCell className="w-full">{engine.name.ar}</TableCell>
            {(canChangeStatus || canEdit) && (
              <TableCell className="flex gap-[7px] items-center">
                {canChangeStatus && (
                  <Switch
                    isSelected={engine.is_active}
                    onChange={() =>
                      handleToggleStatus(engine.id, engine.is_active)
                    }
                  />
                )}
                {canEdit && (
                  <Link to={`/engin-type/edit/${engine.id}`}>
                    <Edit />
                  </Link>
                )}

                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(engine.id)}
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
