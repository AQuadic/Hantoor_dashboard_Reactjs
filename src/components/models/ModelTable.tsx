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
import { useQuery } from "@tanstack/react-query";
import {
  getModels,
  Model,
  GetModelsResponse,
} from "@/api/models/models/getModels";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { deleteModel } from "@/api/models/models/deleteModel";
import Loading from "../general/Loading";
import { editVehicleModel } from "@/api/models/models/editModel";
import NoData from "../general/NoData";

interface ModelTableProps {
  readonly page: number;
  readonly search: string;
  readonly dateParams?: { from_date?: string; to_date?: string };
  readonly setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function ModelTable({
  page,
  search,
  dateParams,
  setPagination,
}: ModelTableProps) {
  const { t, i18n } = useTranslation("models");
  const canEdit = useHasPermission("edit_vehicle_model");
  const canChangeStatus = useHasPermission("change-status_vehicle_model");
  const canDelete = useHasPermission("delete_vehicle_model");

  const {
    data: modelsResponse,
    isLoading,
    refetch,
  } = useQuery<GetModelsResponse, Error>({
    queryKey: ["models-list", page, search, dateParams],
    queryFn: async () => {
      console.debug("ModelTable: fetching models", {
        page,
        perPage: 15,
        search,
        dateParams,
      });
      const res = await getModels(page, 15, search, dateParams);
      console.debug("ModelTable: fetch result meta", res.meta);
      return res;
    },
  });

  // Provide defaults if undefined
  const totalItems = modelsResponse?.meta?.totalItems ?? 0;
  const itemsPerPage = modelsResponse?.meta?.itemsPerPage ?? 10;
  const totalPages = modelsResponse?.meta?.totalPages ?? 1;
  const currentPage = modelsResponse?.meta?.currentPage ?? page;
  // Sometimes API returns items under different keys; prefer data, then items/rows as fallback
  let models: Model[] = [];
  const respAny = modelsResponse as unknown as
    | Record<string, unknown>
    | undefined;

  if (modelsResponse?.data && Array.isArray(modelsResponse.data)) {
    models = modelsResponse.data;
  } else if (respAny && Array.isArray(respAny.items)) {
    models = respAny.items as unknown as Model[];
  } else if (respAny && Array.isArray(respAny.rows)) {
    models = respAny.rows as unknown as Model[];
  } else {
    models = [];
  }

  const paginationData = useMemo(() => {
    const from = models.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const to = models.length > 0 ? from + models.length - 1 : 0;
    return {
      totalPages: Math.max(totalPages, 1),
      totalItems: Math.max(totalItems, models.length),
      itemsPerPage,
      from,
      to,
    };
  }, [totalPages, totalItems, itemsPerPage, models.length, currentPage]);

  useEffect(() => {
    // If meta reports items but models array is empty, log for debugging and still set pagination
    if (models.length === 0 && (modelsResponse?.meta?.totalItems ?? 0) > 0) {
      console.warn(
        "Models meta indicates items but data array is empty:",
        modelsResponse
      );
    }

    setPagination(paginationData);
  }, [paginationData, setPagination, models.length, modelsResponse]);

  const handleDelete = async (id: number) => {
    await deleteModel(id);
    toast.success(t("modelDeletedSuccessfully"));
    refetch();
  };

  const handleToggleStatus = async (model: Model) => {
    try {
      await editVehicleModel(model.id, { is_active: !model.is_active });
      toast.success(
        model.is_active ? t("modelDeactivated") : t("modelActivated")
      );
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
  };

  if (isLoading) return <Loading />;
  if (models.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right ">#</TableHead>
          <TableHead className="text-right">{t("model")}</TableHead>
          {(canChangeStatus || canEdit || canDelete) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.id} noBackgroundColumns={1}>
            <TableCell>{model.id}</TableCell>
            <TableCell className="w-full">
              {i18n.language === "ar"
                ? model.name.ar
                : model.name.en || model.name.ar}
            </TableCell>
            {(canChangeStatus || canEdit || canDelete) && (
              <TableCell className="flex gap-[7px] items-center">
                {canChangeStatus && (
                  <Switch
                    isSelected={model.is_active}
                    onChange={() => handleToggleStatus(model)}
                  />
                )}
                {canEdit && (
                  <Link to={`/models/edit/${model.id}`}>
                    <Edit />
                  </Link>
                )}
                {canDelete && (
                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(model.id)}
                    />
                  </div>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
