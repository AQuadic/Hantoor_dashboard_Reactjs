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
import { useHasPermission } from "@/hooks/usePermissions";
import { Switch } from "@heroui/react";
import {
  useVehicleBodies,
  VehicleBody,
} from "@/api/models/structureType/getStructure";
import { deleteBodyType } from "@/api/models/structureType/deleteStructure";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { updateBodyType } from "@/api/models/structureType/editStructure";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

interface StructureTableProps {
  search?: string;
  page: number;
  dateParams?: { from_date?: string; to_date?: string };
  setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function StructureTable({
  search = "",
  page,
  setPagination,
  dateParams,
}: StructureTableProps) {
  const { t, i18n } = useTranslation("models");
  const canEdit = useHasPermission("edit_vehicle_body_type");
  const canChangeStatus = useHasPermission("change-status_vehicle_body_type");
  const language = i18n.language as "ar" | "en";

  const {
    data: bodiesResponse,
    isLoading,
    refetch,
  } = useVehicleBodies({
    search,
    page,
    per_page: 15,
    ...dateParams,
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

  const handleToggleStatus = async (body: VehicleBody) => {
    try {
      const isActive =
        typeof body.is_active === "number"
          ? body.is_active === 1
          : body.is_active;
      await updateBodyType(body.id, {
        name: body.name,
        is_active: !isActive,
      });
      toast.success(
        !isActive ? t("bodyTypeActivated") : t("bodyTypeDeactivated")
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
          {(canChangeStatus || canEdit) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodies.map((item) => {
          return (
            <TableRow key={item.id} noBackgroundColumns={1}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="w-full">{item.name[language]}</TableCell>
              {(canChangeStatus || canEdit) && (
                <TableCell className="flex gap-[7px] items-center">
                  {canChangeStatus && (
                    <Switch
                      isSelected={
                        typeof item.is_active === "number"
                          ? item.is_active === 1
                          : item.is_active
                      }
                      onChange={() => handleToggleStatus(item)}
                    />
                  )}
                  {canEdit && (
                    <Link to={`/structure-types/edit/${item.id}`}>
                      <Edit />
                    </Link>
                  )}
                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(item.id)}
                    />
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
