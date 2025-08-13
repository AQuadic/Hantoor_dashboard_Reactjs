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
import { EngineType, getEngineType } from "@/api/models/engineTypes/getEngineType";
import { deleteEngineType } from "@/api/models/engineTypes/deleteEngineType";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

export function EngineTypesTable() {
  const { t } = useTranslation("models");
  const { data: engineTypes, isLoading, refetch } = useQuery<EngineType[]>({
    queryKey: ["engineTypes"],
    queryFn: getEngineType,
  });

  const handleDelete = async (id: number) => {
    await deleteEngineType(id);
    toast.success(t('engineTypeDeleted'))
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('engineType')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineTypes?.map((engine, index) => (
          <TableRow key={engine.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{engine.name.ar}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={engine.is_active} />
              <Link to={`/engin-type/edit/${engine.id}`}>
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
