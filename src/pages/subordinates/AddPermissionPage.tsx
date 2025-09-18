import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React from "react";
import { useParams } from "react-router";
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

  const isEdit = Boolean(roleId);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // State for role name and selected permissions
  const [roleName, setRoleName] = React.useState("");
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch permissions list
  const { data: permissionsData, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

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
      toast.success(t("roleCreatedSuccessfully") || "Role created successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      // Reset form or navigate away
      setRoleName("");
      setSelectedPermissions([]);
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      toast.error(t("failedToCreateRole") || "Failed to create role");
    },
  });

  // Update role mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; permissions: string[] } }) => 
      updateRole(id, data),
    onSuccess: () => {
      toast.success(t("roleUpdatedSuccessfully") || "Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", roleId] });
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error(t("failedToUpdateRole") || "Failed to update role");
    },
  });

  // Effect to populate form when editing
  React.useEffect(() => {
    if (isEdit && roleData) {
      setRoleName(roleData.name);
      setSelectedPermissions(roleData.permissions || []);
    }
  }, [isEdit, roleData]);

  // Helper function to format section names (similar to RoleModal)
  const formatSectionName = (sectionKey: string): string => {
    return sectionKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Handle permission changes
  const handlePermissionChange = (sectionKey: string, updatedPermissions: PermissionStateTypes[]) => {
    // Get the original permission names from this section
    const sectionData = permissionsData?.permissions?.[sectionKey] || [];
    
    // Map updated permissions back to original permission names
    const sectionPermissionNames = updatedPermissions
      .map((p, index) => ({ 
        original: sectionData[index], 
        isSelected: p.isSelected 
      }))
      .filter(p => p.isSelected)
      .map(p => p.original);
    
    // Update selected permissions for this section
    const otherSectionsPermissions = selectedPermissions.filter(p => !sectionData.includes(p));
    setSelectedPermissions([...otherSectionsPermissions, ...sectionPermissionNames]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!roleName.trim()) {
      toast.error(t("pleaseEnterRoleName") || "Please enter a role name");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error(t("selectAtLeastOnePermission") || "Please select at least one permission");
      return;
    }

    setIsSubmitting(true);

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
        titleAr={isEdit ? " تعديل الصلاحية" : "اضافة صلاحية جديدة"}
        titleEn={isEdit ? "Edit Permission" : "Add Permission"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: isEdit ? "تعديل الصلاحية" : "اضافة صلاحية جديدة",
            titleEn: isEdit ? "Edit Permission" : "Add Permission",
            link: isEdit ? `/permissions/${roleId}` : "/permissions/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8 pt-0 bg-white rounded-b-2xl">
        <DashboardInput
          label="اسم الصلاحية"
          value={roleName}
          onChange={setRoleName}
          placeholder="مدير"
        />
      </div>
      <div className="px-8 py-4 space-y-8">
        {/* Permissions from API */}
        {permissionsData?.permissions && (
          <div className="space-y-6">
            {Object.entries(permissionsData.permissions).map(([sectionKey, permissions]) => (
              <div key={sectionKey} className="space-y-4">
                <PermissionsCard
                  titleAr={formatSectionName(sectionKey)}
                  titleEn={formatSectionName(sectionKey)}
                  selectedPermissions={permissions.map(permission => ({
                    permission: {
                      titleAr: permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                      titleEn: permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                    },
                    isSelected: selectedPermissions.includes(permission),
                  }))}
                  setSelectedPermissions={(updatedPermissions) => 
                    handlePermissionChange(sectionKey, updatedPermissions)
                  }
                />
              </div>
            ))}
          </div>
        )}

        {(() => {
          let buttonTitleAr: string;
          let buttonTitleEn: string;
          
          if (isSubmitting) {
            buttonTitleAr = "جاري الحفظ...";
            buttonTitleEn = "Saving...";
          } else if (isEdit) {
            buttonTitleAr = "تعديل";
            buttonTitleEn = "Update";
          } else {
            buttonTitleAr = "اضافة";
            buttonTitleEn = "Add";
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
