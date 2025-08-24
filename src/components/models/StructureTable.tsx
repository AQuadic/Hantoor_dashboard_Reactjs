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
import { getModels } from "@/api/models/models/getModels";
import { deleteBodyType } from "@/api/models/structureType/deleteStructure";
import toast from "react-hot-toast";

export function StructureTable() {
  const { t, i18n } = useTranslation("models");
  const language = i18n.language as "ar" | "en";

  const { data: bodies, isLoading, isError, refetch } = useVehicleBodies({
    pagination: false,
  });

  const { data: modelsData = [] } = useQuery({
    queryKey: ["models-list"],
    queryFn: getModels,
  });

    const handleDelete = async (id: number) => {
      await deleteBodyType(id);
      toast.success(t("bodyTypeDeleted"));
      refetch();
    };

  if (isLoading) return <div>{t("loading")}</div>;
  if (isError) return <div>{t("errorLoadingData")}</div>;

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
          {(bodies ?? []).map((item, index) => {
            const model = modelsData.find(
              (m: any) => m.id === item.vehicle_model_id
            );

            return (
              <TableRow key={item.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
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
