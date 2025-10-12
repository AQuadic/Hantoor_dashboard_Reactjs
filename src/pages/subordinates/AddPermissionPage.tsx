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
  const validateName = () => {
    const nameTrimmed = roleName.trim();
    if (!nameTrimmed) {
      const validationMsg = t("nameMustBeText", {
        defaultValue: "يجب أن يكون حقل الاسم نصًا.",
      });
      toast.error(validationMsg);
      return false;
    }
    return true;
  };

  const submitRole = async () => {
    try {
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
      const backendMsg = extractBackendMessage(error, t);
      toast.error(backendMsg);
    }
  };

  const extractBackendMessage = (
    error: unknown,
    tFn: (k: string) => string
  ) => {
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

    return backendMsg || tFn("failedToUpdateRole");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!validateName()) {
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting role data:", {
      name: roleName,
      permissions: selectedPermissions,
      isEdit,
      roleId,
    });

    await submitRole();

    setIsSubmitting(false);
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
            {/*
              Grouping and renaming logic:
              - Put specific sections under a single titled group (المسؤولين الفرعيين)
              - Render permission cards in two columns per row (grid)
              - Keep control panel / dashboard full width (col-span-2)
            */}

            {/* Grouping logic for permission sections */}
            {(() => {
              // Keys for first group (المسؤولين الفرعيين)
              const group1Keys = [
                "admin",
                "permission",
                "role",
                "user",
                "country",
                "brand",
                "agent",
              ];

              // Keys for second group (اقسام السيارات)
              const group2Keys = [
                "vehicle_model",
                "seat_count",
                "engine_type",
                "brand_origin",
                "engine_size",
                "price_from",
                "price_to",
                "category",
                "vehicle_body_type",
                "vehicle_type",
                "vehicle_class",
                "vehicle_model_type",
              ];

              const entries = Object.entries(permissionsData.permissions);

              const isGrouped = (sectionKey: string) => {
                return group1Keys.includes(sectionKey.toLowerCase());
              };

              const isGrouped2 = (sectionKey: string) => {
                return group2Keys.includes(sectionKey.toLowerCase());
              };

              const firstGroupedIndex = entries.findIndex(([k]) =>
                isGrouped(k)
              );
              if (firstGroupedIndex === -1) return null;

              const beforeEntries = entries.slice(0, firstGroupedIndex);
              const groupedEntries = entries.filter(([k]) => isGrouped(k));
              const groupedVehiclesEntries = entries.filter(([k]) =>
                isGrouped2(k)
              );
              const afterEntries = entries
                .slice(firstGroupedIndex)
                .filter(([k]) => !isGrouped(k) && !isGrouped2(k));

              return (
                <>
                  {/* render entries before the group in original order */}
                  {beforeEntries.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {beforeEntries.map(([sectionKey, permissions]) => {
                        const translated = t(
                          `permissionSections.${sectionKey}`,
                          {
                            defaultValue: sectionKey,
                          }
                        );

                        const isControlPanel =
                          translated === "لوحة التحكم" ||
                          sectionKey.toLowerCase().includes("control") ||
                          sectionKey.toLowerCase().includes("dashboard");

                        return (
                          <div
                            key={sectionKey}
                            className={
                              isControlPanel ? "md:col-span-2" : undefined
                            }
                          >
                            <PermissionsCard
                              titleAr={translated}
                              titleEn={translated}
                              selectedPermissions={permissions.map(
                                (permission) => ({
                                  permission: {
                                    titleAr: t(
                                      `permissionNames.${permission}`,
                                      { defaultValue: permission }
                                    ),
                                    titleEn: t(
                                      `permissionNames.${permission}`,
                                      { defaultValue: permission }
                                    ),
                                  },
                                  isSelected:
                                    selectedPermissions.includes(permission),
                                })
                              )}
                              setSelectedPermissions={(updatedPermissions) =>
                                handlePermissionChange(
                                  sectionKey,
                                  updatedPermissions
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* grouped header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[21px]  font-bold text-black">
                          {t("subordinatesGroup")}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {groupedEntries.map(([sectionKey, permissions]) => {
                        const title = t(`permissionSections.${sectionKey}`, {
                          defaultValue: sectionKey,
                        });

                        const isControlPanel =
                          title === "لوحة التحكم" ||
                          sectionKey.toLowerCase().includes("control") ||
                          sectionKey.toLowerCase().includes("dashboard");

                        // Check if divider should be shown after this card
                        // moved divider from 'الوكلاء' to be under 'الدور'
                        const shouldShowDivider =
                          title === "الصلاحيات" || title === "الدور";

                        return (
                          <>
                            <div
                              key={sectionKey}
                              className={
                                isControlPanel
                                  ? "md:col-span-2 space-y-4"
                                  : "space-y-4"
                              }
                            >
                              <PermissionsCard
                                titleAr={title}
                                titleEn={title}
                                selectedPermissions={permissions.map(
                                  (permission) => ({
                                    permission: {
                                      titleAr: t(
                                        `permissionNames.${permission}`,
                                        { defaultValue: permission }
                                      ),
                                      titleEn: t(
                                        `permissionNames.${permission}`,
                                        { defaultValue: permission }
                                      ),
                                    },
                                    isSelected:
                                      selectedPermissions.includes(permission),
                                  })
                                )}
                                setSelectedPermissions={(updatedPermissions) =>
                                  handlePermissionChange(
                                    sectionKey,
                                    updatedPermissions
                                  )
                                }
                              />
                            </div>
                            {shouldShowDivider && (
                              <div
                                key={`divider-${sectionKey}`}
                                className="md:col-span-2 mt-2 -mb-4"
                              >
                                <hr className="border-t border-gray-300" />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vehicle sections header */}
                  {groupedVehiclesEntries.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[21px] font-bold text-black">
                            {t("carSections", {
                              defaultValue: "اقسام السيارات",
                            })}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {groupedVehiclesEntries.map(
                          ([sectionKey, permissions]) => {
                            const title = t(
                              `permissionSections.${sectionKey}`,
                              {
                                defaultValue: sectionKey,
                              }
                            );

                            const isControlPanel =
                              title === "لوحة التحكم" ||
                              sectionKey.toLowerCase().includes("control") ||
                              sectionKey.toLowerCase().includes("dashboard");

                            const shouldShowDivider = title === "السعر إلى";

                            return (
                              <>
                                <div
                                  key={sectionKey}
                                  className={
                                    isControlPanel
                                      ? "md:col-span-2 space-y-4"
                                      : "space-y-4"
                                  }
                                >
                                  <PermissionsCard
                                    titleAr={title}
                                    titleEn={title}
                                    selectedPermissions={permissions.map(
                                      (permission) => ({
                                        permission: {
                                          titleAr: t(
                                            `permissionNames.${permission}`,
                                            { defaultValue: permission }
                                          ),
                                          titleEn: t(
                                            `permissionNames.${permission}`,
                                            { defaultValue: permission }
                                          ),
                                        },
                                        isSelected:
                                          selectedPermissions.includes(
                                            permission
                                          ),
                                      })
                                    )}
                                    setSelectedPermissions={(
                                      updatedPermissions
                                    ) =>
                                      handlePermissionChange(
                                        sectionKey,
                                        updatedPermissions
                                      )
                                    }
                                  />
                                </div>
                                {shouldShowDivider && (
                                  <div
                                    key={`divider-${sectionKey}`}
                                    className="md:col-span-2 mt-2 -mb-4"
                                  >
                                    <hr className="border-t border-gray-300" />
                                  </div>
                                )}
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {/* render remaining entries after group */}
                  {afterEntries.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {afterEntries.map(([sectionKey, permissions]) => {
                        const translated = t(
                          `permissionSections.${sectionKey}`,
                          { defaultValue: sectionKey }
                        );

                        const isContactUs =
                          translated === "تواصل معنا" ||
                          sectionKey.toLowerCase() === "contact_us";

                        const isControlPanel =
                          translated === "لوحة التحكم" ||
                          sectionKey.toLowerCase().includes("control") ||
                          sectionKey.toLowerCase().includes("dashboard");

                        const shouldShowDivider = isContactUs;

                        let containerClass: string | undefined;
                        if (isContactUs) {
                          containerClass = "";
                        } else if (isControlPanel) {
                          containerClass = "md:col-span-2";
                        } else {
                          containerClass = undefined;
                        }

                        return (
                          <>
                            <div key={sectionKey} className={containerClass}>
                              <PermissionsCard
                                titleAr={translated}
                                titleEn={translated}
                                selectedPermissions={permissions.map(
                                  (permission) => ({
                                    permission: {
                                      titleAr: t(
                                        `permissionNames.${permission}`,
                                        { defaultValue: permission }
                                      ),
                                      titleEn: t(
                                        `permissionNames.${permission}`,
                                        { defaultValue: permission }
                                      ),
                                    },
                                    isSelected:
                                      selectedPermissions.includes(permission),
                                  })
                                )}
                                setSelectedPermissions={(updatedPermissions) =>
                                  handlePermissionChange(
                                    sectionKey,
                                    updatedPermissions
                                  )
                                }
                              />
                            </div>
                            {shouldShowDivider && (
                              <div
                                key={`divider-${sectionKey}`}
                                className="md:col-span-2 mt-2 -mb-4"
                              >
                                <hr className="border-t border-gray-300" />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}
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
