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
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";
import { useVehicleBodies } from "@/api/models/structureType/getStructure";
import { useQuery } from "@tanstack/react-query";
import { getModels, GetModelsResponse } from "@/api/models/models/getModels";
import { deleteBodyType } from "@/api/models/structureType/deleteStructure";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface StructureTableProps {
  search: string;
  page: number;
  setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function StructureTable({ search, page, setPagination }: StructureTableProps) {
  const { t, i18n } = useTranslation("models");
  const language = i18n.language as "ar" | "en";

  const { data: bodiesResponse, isLoading, isError, refetch } = useVehicleBodies({
    pagination: true,
    search,
  });

const { data: modelsResponse } = useQuery<GetModelsResponse, Error>({
  queryKey: ["models-list", 1, ""], 
  queryFn: ({ queryKey }) => {
    const [_key, page = 1, search = ""] = queryKey as [string, number, string];
    return getModels(page, 10, search);
  },
});


  const modelsData = modelsResponse?.data ?? [];

  useEffect(() => {
    if (bodiesResponse && typeof bodiesResponse === 'object' && 'current_page' in bodiesResponse) {
      setPagination({
        totalPages: bodiesResponse.last_page,
        totalItems: bodiesResponse.total,
        itemsPerPage: bodiesResponse.per_page,
        from: bodiesResponse.from,
        to: bodiesResponse.to,
      });
    }
  }, [bodiesResponse, setPagination]);

    const handleDelete = async (id: number) => {
      await deleteBodyType(id);
      toast.success(t("bodyTypeDeleted"));
      refetch();
    };

  if (isLoading) return <div>{t("loading")}</div>;
  if (isError) return <div>{t("errorLoadingData")}</div>;

  const bodies = Array.isArray(bodiesResponse) 
    ? bodiesResponse 
    : bodiesResponse?.data ?? [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("structureType")}</TableHead>
          <TableHead className="text-right">{t("model")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodies.map((item, index) => {
          const model = modelsData.find((m: any) => m.id === item.vehicle_model_id);
          
          const displayIndex = bodiesResponse && typeof bodiesResponse === 'object' && 'from' in bodiesResponse
            ? (bodiesResponse.from || 0) + index
            : index + 1;

            return (
              <TableRow key={item.id} noBackgroundColumns={1}>
                <TableCell>{displayIndex}</TableCell>
                <TableCell>{item.name[language]}</TableCell>
                <TableCell className="w-full">
                  {model ? model.name[language] : t("noModel")}
                </TableCell>
                <TableCell className="flex gap-[7px] items-center">
                  <Switch isSelected={!!item.is_active} />
                  <Link to={`/structure-types/edit/${item.id}`}>
                    <Edit />
                  </Link>
                  <div className="mt-2">
                    <TableDeleteButton handleDelete={() => handleDelete(item.id)} />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  );
}
