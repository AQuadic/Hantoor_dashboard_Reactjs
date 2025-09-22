import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React from "react";
import { useParams, useNavigate } from "react-router";
import PermissionsCard from "@/components/subordinates/PermissionsCard";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPermissions } from "@/api/roles/getPermissions";
import { createRole } from "@/api/roles/createRole";
import { updateRole } from "@/api/roles/updateRole";
import { getRole } from "@/api/roles/getRole";
import { PermissionStateTypes } from "@/types/PermissionTypes";
import Loading from "@/components/general/Loading";
import toast from "react-hot-toast";

const AddPermissionPage = () => {
  const params = useParams();
  const roleId = params.id;
  const navigate = useNavigate();

  const isEdit = Boolean(roleId);
  const { t } = useTranslation("subordinates");
  const queryClient = useQueryClient();

  // State for role name and selected permissions
  const [roleName, setRoleName] = React.useState("");
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    string[]
  >([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch permissions list
  const { data: permissionsData, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  // Debug log when permissions data changes
  React.useEffect(() => {
    if (permissionsData) {
      console.log("Permissions loaded:", permissionsData);
    }
  }, [permissionsData]);

  // Fetch role data when editing
  const { data: roleData, isLoading: isLoadingRole } = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getRole(Number(roleId)),
    enabled: isEdit && !!roleId,
  });

  // Create role mutation
  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      toast.success(t("roleCreatedSuccessfully"));
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      // Navigate back to subordinates page with permissions tab
      navigate("/subordinates");
    },
  });

  // Update role mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name: string; permissions: string[] };
    }) => updateRole(id, data),
    onSuccess: () => {
      toast.success(t("roleUpdatedSuccessfully"));
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", roleId] });
      // Navigate back to subordinates page with permissions tab
      navigate("/subordinates");
    },
    onError: (error: unknown) => {
      console.error("Error updating role:", error);
      const errorMessage =
        error instanceof Error ? error.message : t("failedToUpdateRole");
      toast.error(errorMessage);
    },
  });

  // Effect to populate form when editing
  React.useEffect(() => {
    if (isEdit && roleData) {
      console.log("Loading existing role data:", roleData);
      setRoleName(roleData.name);
      setSelectedPermissions(roleData.permissions || []);
    }
  }, [isEdit, roleData]);

  // Handle permission changes
  const handlePermissionChange = (
    sectionKey: string,
    updatedPermissions: PermissionStateTypes[]
  ) => {
    // Get the original permission names from this section
    const sectionData = permissionsData?.permissions?.[sectionKey] || [];

    // Map updated permissions back to original permission names
    const sectionPermissionNames = updatedPermissions
      .map((p, index) => ({
        original: sectionData[index],
        isSelected: p.isSelected,
      }))
      .filter((p) => p.isSelected)
      .map((p) => p.original);

    // Update selected permissions for this section
    const otherSectionsPermissions = selectedPermissions.filter(
      (p) => !sectionData.includes(p)
    );

    const newSelectedPermissions = [
      ...otherSectionsPermissions,
      ...sectionPermissionNames,
    ];

    console.log("Permission change:", {
      sectionKey,
      sectionData,
      sectionPermissionNames,
      otherSectionsPermissions,
      newSelectedPermissions,
    });

    setSelectedPermissions(newSelectedPermissions);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Client-side validation: ensure role name is present and non-empty
    const nameTrimmed = roleName.trim();
    if (!nameTrimmed) {
      const validationMsg = t("nameMustBeText", {
        defaultValue: "يجب أن يكون حقل الاسم نصًا.",
      });
      toast.error(validationMsg);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting role data:", {
        name: roleName,
        permissions: selectedPermissions,
        isEdit,
        roleId,
      });

      if (isEdit && roleId) {
        await updateMutation.mutateAsync({
          id: Number(roleId),
          data: {
            name: roleName,
            permissions: selectedPermissions,
          },
        });
      } else {
        await createMutation.mutateAsync({
          name: roleName,
          permissions: selectedPermissions,
        });
      }
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      let backendMsg = "An unexpected error occurred";

      if (error instanceof Error) {
        backendMsg = error.message;
        // Try to extract backend error message if available
        if (
          "response" in error &&
          typeof error.response === "object" &&
          error.response
        ) {
          const response = error.response as Record<string, unknown>;
          if (typeof response.data === "object" && response.data) {
            const data = response.data as Record<string, unknown>;
            if (typeof data.message === "string") {
              backendMsg = data.message;
            } else if (typeof data.error === "string") {
              backendMsg = data.error;
            }
          }
        }
      }

      toast.error(backendMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingPermissions || (isEdit && isLoadingRole)) {
    return <Loading />;
  }

  return (
    <section>
      <DashboardHeader
        titleAr={isEdit ? t("editPermission") : t("addPermission")}
        titleEn={isEdit ? t("editPermission") : t("addPermission")}
        items={[
          {
            titleAr: t("home"),
            titleEn: t("home"),
            link: "/",
          },
          {
            titleAr: isEdit ? t("editPermission") : t("addPermission"),
            titleEn: isEdit ? t("editPermission") : t("addPermission"),
            link: isEdit ? `/permissions/${roleId}` : "/permissions/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8 pt-0 bg-white rounded-b-2xl">
        <DashboardInput
          label={t("roleName")}
          value={roleName}
          onChange={(val: string) => setRoleName(val)}
          placeholder={t("roleNamePlaceholder")}
        />
      </div>
      <div className="px-8 py-4 space-y-8">
        {/* Permissions from API */}
        {permissionsData?.permissions && (
          <div className="space-y-6">
            {Object.entries(permissionsData.permissions).map(
              ([sectionKey, permissions]) => (
                <div key={sectionKey} className="space-y-4">
                  <PermissionsCard
                    titleAr={t(`permissionSections.${sectionKey}`, {
                      defaultValue: sectionKey,
                    })}
                    titleEn={t(`permissionSections.${sectionKey}`, {
                      defaultValue: sectionKey,
                    })}
                    selectedPermissions={permissions.map((permission) => ({
                      permission: {
                        titleAr: t(`permissionNames.${permission}`, {
                          defaultValue: permission,
                        }),
                        titleEn: t(`permissionNames.${permission}`, {
                          defaultValue: permission,
                        }),
                      },
                      isSelected: selectedPermissions.includes(permission),
                    }))}
                    setSelectedPermissions={(updatedPermissions) =>
                      handlePermissionChange(sectionKey, updatedPermissions)
                    }
                  />
                </div>
              )
            )}
          </div>
        )}

        {(() => {
          let buttonTitleAr: string;
          let buttonTitleEn: string;

          if (isSubmitting) {
            buttonTitleAr = t("saving");
            buttonTitleEn = t("saving");
          } else if (isEdit) {
            buttonTitleAr = t("update");
            buttonTitleEn = t("update");
          } else {
            buttonTitleAr = t("add");
            buttonTitleEn = t("add");
          }

          return (
            <DashboardButton
              titleAr={buttonTitleAr}
              titleEn={buttonTitleEn}
              onClick={handleSubmit}
            />
          );
        })()}
      </div>
    </section>
  );
};

export default AddPermissionPage;
