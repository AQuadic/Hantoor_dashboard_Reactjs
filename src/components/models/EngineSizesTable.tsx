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
import { EngineSize, getEngineSize } from "@/api/models/engineSize/getEnginSize";
import { deleteEngineSize } from "@/api/models/engineSize/deleteEngineSize";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function EngineSizesTable() {
  const { t } = useTranslation("models");
  const { data: engineSize, refetch } = useQuery<EngineSize[]>({
    queryKey: ["engineSize"],
    queryFn: getEngineSize,
  });

  const handleDelete = async (id: number) => {
    await deleteEngineSize(id);
    toast.success(t('engineSizeDeleted'))
    refetch();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('engineSize')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineSize?.map((engine, index) => (
          <TableRow key={engine.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{engine.name.ar}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={engine.is_active} />
              <Link to={`/engine-size/edit/${engine.id}`}>
                <Edit />
              </Link>

              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(engine.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
