import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Checkbox,
} from "@heroui/react";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPermissions } from "@/api/roles/getPermissions";
import { createRole } from "@/api/roles/createRole";
import { updateRole } from "@/api/roles/updateRole";
import { getRole } from "@/api/roles/getRole";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

interface RoleModalProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly roleId?: number | null;
  readonly mode: "create" | "edit";
}

export default function RoleModal({
  isOpen,
  onOpenChange,
  roleId,
  mode,
}: RoleModalProps) {
  const { t } = useTranslation("subordinates");
  const queryClient = useQueryClient();

  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch permissions list
  const { data: permissionsData, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
    enabled: isOpen,
  });

  // Fetch role data when editing
  const { data: roleData, isLoading: isLoadingRole } = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getRole(roleId!),
    enabled: isOpen && mode === "edit" && !!roleId,
  });

  // Create role mutation
  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      toast.success(
        t("roleCreatedSuccessfully") || "Role created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      toast.error(t("failedToCreateRole") || "Failed to create role");
    },
  });

  // Update role mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name?: string; permissions?: string[] };
    }) => updateRole(id, data),
    onSuccess: () => {
      toast.success(
        t("roleUpdatedSuccessfully") || "Role updated successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", roleId] });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error(t("failedToUpdateRole") || "Failed to update role");
    },
  });

  const resetForm = () => {
    setRoleName("");
    setSelectedPermissions([]);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && roleData) {
      setRoleName(roleData.name);
      setSelectedPermissions(roleData.permissions);
    }
  }, [mode, roleData]);

  const handleSubmit = async () => {
    if (!roleName.trim()) {
      toast.error(t("roleNameRequired") || "Role name is required");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error(
        t("selectAtLeastOnePermission") ||
          "Please select at least one permission"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createMutation.mutateAsync({
          name: roleName,
          permissions: selectedPermissions,
        });
      } else if (mode === "edit" && roleId) {
        await updateMutation.mutateAsync({
          id: roleId,
          data: {
            name: roleName,
            permissions: selectedPermissions,
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePermissionChange = (
    sectionKey: string,
    permission: string,
    isSelected: boolean
  ) => {
    setSelectedPermissions((prev) => {
      if (isSelected) {
        return [...prev, permission];
      } else {
        return prev.filter((p) => p !== permission);
      }
    });
  };

  const handleSectionToggle = (
    sectionKey: string,
    permissions: string[],
    isSelected: boolean
  ) => {
    setSelectedPermissions((prev) => {
      if (isSelected) {
        // Add all permissions from this section
        const newPermissions = permissions.filter((p) => !prev.includes(p));
        return [...prev, ...newPermissions];
      } else {
        // Remove all permissions from this section
        return prev.filter((p) => !permissions.includes(p));
      }
    });
  };

  const getSectionCheckedState = (permissions: string[]) => {
    const selectedCount = permissions.filter((p) =>
      selectedPermissions.includes(p)
    ).length;
    if (selectedCount === 0) return false;
    if (selectedCount === permissions.length) return true;
    return "indeterminate";
  };

  // Format section name for display
  const formatSectionName = (sectionKey: string) => {
    return sectionKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (isLoadingPermissions || (mode === "edit" && isLoadingRole)) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          <ModalBody className="p-6">
            <Loading />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-xl font-semibold">
            {mode === "create"
              ? t("createRole") || "Create Role"
              : t("editRole") || "Edit Role"}
          </h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="space-y-6">
            {/* Role Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("roleName") || "Role Name"} *
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t("enterRoleName") || "Enter role name"}
              />
            </div>

            {/* Permissions Selection */}
            <div>
              <label className="block text-sm font-medium mb-4">
                {t("permissions") || "Permissions"} *
              </label>

              {permissionsData?.permissions && (
                <div className="space-y-4 max-h-96 overflow-y-auto border rounded-md p-4">
                  {Object.entries(permissionsData.permissions).map(
                    ([sectionKey, permissions]) => {
                      const sectionCheckedState =
                        getSectionCheckedState(permissions);

                      return (
                        <div
                          key={sectionKey}
                          className="border-b border-gray-200 pb-4 last:border-b-0"
                        >
                          <div className="flex items-center mb-3">
                            <Checkbox
                              isSelected={sectionCheckedState === true}
                              isIndeterminate={
                                sectionCheckedState === "indeterminate"
                              }
                              onValueChange={(isSelected) =>
                                handleSectionToggle(
                                  sectionKey,
                                  permissions,
                                  isSelected
                                )
                              }
                              className="mr-3"
                            />
                            <h3 className="font-medium text-lg">
                              {formatSectionName(sectionKey)}
                            </h3>
                          </div>

                          <div className="grid grid-cols-2 gap-2 ml-8">
                            {permissions.map((permission) => (
                              <Checkbox
                                key={permission}
                                isSelected={selectedPermissions.includes(
                                  permission
                                )}
                                onValueChange={(isSelected) =>
                                  handlePermissionChange(
                                    sectionKey,
                                    permission,
                                    isSelected
                                  )
                                }
                              >
                                <span className="text-sm">
                                  {permission
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              </Checkbox>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <DashboardButton
                titleEn="Cancel"
                titleAr="إلغاء"
                variant="primary"
                onClick={() => onOpenChange(false)}
              />
              <DashboardButton
                titleEn={mode === "create" ? "Create" : "Update"}
                titleAr={mode === "create" ? "إنشاء" : "تحديث"}
                variant="add"
                onClick={handleSubmit}
                isLoading={
                  isSubmitting ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
