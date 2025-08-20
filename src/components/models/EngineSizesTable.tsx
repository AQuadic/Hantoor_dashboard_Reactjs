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
import toast from "react-hot-toast";
import Loading from "../general/Loading";

interface EngineSizesTableProps {
  search?: string;
  page?: number;
  setPagination?: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function EngineSizesTable({
  search = "",
  page = 1,
  setPagination,
}: EngineSizesTableProps) {
  const { t, i18n } = useTranslation("models");
  const {
    data: engineSize,
    isLoading,
    refetch,
  } = useQuery<EngineSize[]>({
    queryKey: ["engineSize", page, search],
    queryFn: async () => {
      const r = await getEngineSizePaginated({ page, search });
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

  if (isLoading) {
    return <Loading />;
  }

  const filtered = engineSize?.filter((engine) => {
    const name =
      i18n.language === "ar"
        ? engine.name.ar.slice(0, 7)
        : engine.name.en.slice(0, 7);
    return name.toLowerCase().includes(search.toLowerCase());
  });

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
        {filtered?.map((engine, index) => (
          <TableRow key={engine.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">
              {i18n.language === "ar"
                ? engine.name.ar.slice(0, 7)
                : engine.name.en.slice(0, 7)}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={engine.is_active} />
              <Link to={`/engine-size/edit/${engine.id}`}>
                <Edit />
              </Link>

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
