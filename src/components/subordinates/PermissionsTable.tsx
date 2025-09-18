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
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, type Role } from "@/api/roles/getRoles";
import { deleteRole } from "@/api/roles/deleteRole";
import { updateRole } from "@/api/roles/updateRole";
import type { DateFilterParams } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

import { useNavigate } from "react-router";

interface PermissionsTableProps {
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly searchTerm?: string;
  readonly dateParams?: DateFilterParams;
}

export function PermissionsTable({
  currentPage,
  itemsPerPage,
  searchTerm,
  dateParams,
}: PermissionsTableProps) {
  const { t } = useTranslation("subordinates");
  const [activeStates, setActiveStates] = useState<Record<number, boolean>>({});
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["roles", currentPage, itemsPerPage, searchTerm, dateParams],
    queryFn: () =>
      getRoles({
        search: searchTerm,
        pagination: "normal",
        per_page: itemsPerPage,
        page: currentPage,
        ...(dateParams || {}),
      }),
  });

  useEffect(() => {
    // Initialize active state for each role using the API-provided is_active if present
    const initial: Record<number, boolean> = {};
    data?.data?.forEach((r: Role) => {
      initial[r.id] = !!r.is_active;
    });
    setActiveStates(initial);
  }, [data]);

  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success(
        t("roleDeletedSuccessfully") || "Role deleted successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting role:", error);
      toast.error(t("failedToDeleteRole") || "Failed to delete role");
    },
  });

  const handleDelete = async (roleId: number) => {
    await deleteMutation.mutateAsync(roleId);
  };

  const handleEditRole = (roleId: number) => {
    // Redirect to the add/edit permission page which handles both create and edit
    navigate(`/subordinates/permissions/${roleId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <NoData />
        <p className="mt-4 text-gray-500">
          {t("noRolesFound") || "No roles found"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t("name") || "Name"}</TableHead>
            <TableHead className="text-right w-full">
              {t("permissions") || "Permissions"}
            </TableHead>
            <TableHead className="text-right">
              {t("status") || "Status"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((role: Role, index: number) => (
            <TableRow key={role.id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {role.permissions.length} {t("permissions") || "permissions"}
                </span>
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Switch
                  isSelected={!!activeStates[role.id]}
                  onChange={async () => {
                    const current = !!activeStates[role.id];
                    try {
                      await updateRole(role.id, { is_active: !current });
                      setActiveStates((s) => ({ ...s, [role.id]: !current }));
                      toast.success(
                        !current
                          ? t("roleActivated") || "Role activated"
                          : t("roleDeactivated") || "Role deactivated"
                      );
                      queryClient.invalidateQueries({ queryKey: ["roles"] });
                      refetch();
                    } catch (error) {
                      console.error(
                        "Failed to update role active state",
                        error
                      );
                      toast.error(t("error") || "Error");
                    }
                  }}
                />
                <button onClick={() => handleEditRole(role.id)}>
                  <Edit />
                </button>
                <TableDeleteButton handleDelete={() => handleDelete(role.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Editing handled on separate page: /permissions/:id */}
    </>
  );
}
