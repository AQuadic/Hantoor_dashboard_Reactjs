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
import { deleteBodyType } from "@/api/models/structureType/deleteStructure";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  BodyType,
  updateBodyType,
} from "@/api/models/structureType/editStructure";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

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

export function StructureTable({
  search,
  setPagination,
}: Readonly<StructureTableProps>) {
  const { t, i18n } = useTranslation("models");
  const language = i18n.language as "ar" | "en";

  const {
    data: bodiesResponse,
    isLoading,
    refetch,
  } = useVehicleBodies({
    pagination: true,
    search,
  });

  useEffect(() => {
    if (
      bodiesResponse &&
      typeof bodiesResponse === "object" &&
      "current_page" in bodiesResponse
    ) {
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

  const handleToggleStatus = async (body: BodyType) => {
    try {
      await updateBodyType(body.id, {
        name: body.name,
        is_active: !body.is_active,
      });
      toast.success(
        !body.is_active ? t("bodyTypeActivated") : t("bodyTypeDeactivated")
      );
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
  };
  if (isLoading) return <Loading />;

  const bodies = Array.isArray(bodiesResponse)
    ? bodiesResponse
    : bodiesResponse?.data ?? [];
  if (!bodies || bodies.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("structureType")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodies.map((item, index) => {
          const displayIndex =
            bodiesResponse &&
            typeof bodiesResponse === "object" &&
            "from" in bodiesResponse
              ? (bodiesResponse.from || 0) + index
              : index + 1;

          return (
            <TableRow key={item.id} noBackgroundColumns={1}>
              <TableCell>{displayIndex}</TableCell>
              <TableCell className="w-full">{item.name[language]}</TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch
                  isSelected={!!item.is_active}
                  onChange={() => handleToggleStatus(item)}
                />
                <Link to={`/structure-types/edit/${item.id}`}>
                  <Edit />
                </Link>
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(item.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
