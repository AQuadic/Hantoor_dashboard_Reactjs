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
  readonly setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function ModelTable({ page, search, setPagination }: ModelTableProps) {
  const { t, i18n } = useTranslation("models");

  const {
    data: modelsResponse,
    isLoading,
    refetch,
  } = useQuery<GetModelsResponse, Error>({
    queryKey: ["models-list", page, search],
    queryFn: () => getModels(page, 10, search),
  });

  // Provide defaults if undefined
  const totalItems = modelsResponse?.meta?.totalItems ?? 0;
  const itemsPerPage = modelsResponse?.meta?.itemsPerPage ?? 10;
  const totalPages = modelsResponse?.meta?.totalPages ?? 1;
  const currentPage = modelsResponse?.meta?.currentPage ?? page;
  const models: Model[] = modelsResponse?.data ?? [];

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
    setPagination(paginationData);
  }, [paginationData, setPagination]);

  const handleDelete = async (id: number) => {
    await deleteModel(id);
    toast.success(t("modelDeletedSuccessfully"));
    refetch();
  };

  const handleToggleStatus = async (model: Model) => {
    try {
      await editVehicleModel(model.id, { is_active: !model.is_active });
      toast.success(
        !model.is_active ? t("modelActivated") : t("modelDeactivated")
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
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model, index) => (
          <TableRow key={model.id} noBackgroundColumns={1}>
            <TableCell>{paginationData.from + index}</TableCell>
            <TableCell className="w-full">
              {i18n.language === "ar"
                ? model.name.ar
                : model.name.en || model.name.ar}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={model.is_active}
                onChange={() => handleToggleStatus(model)}
              />
              <Link to={`/models/edit/${model.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton
                  handleDelete={() => handleDelete(model.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
