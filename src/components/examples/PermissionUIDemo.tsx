import React from "react";
import { ProtectedComponent } from "@/components/permissions/ProtectedComponent";
import {
  CreateButton,
  EditButton,
  DeleteButton,
  ViewButton,
  ActionButtons,
} from "@/components/permissions/PermissionButtons";
import {
  PageSection,
  UserManagementSection,
  AdminSection,
  VehicleManagementSection,
  FinancingSection,
  ReportsSection,
  SettingsSection,
} from "@/components/permissions/PageSections";
import {
  useSectionVisibility,
  withPermissions,
} from "@/utils/permissionSectionUtils";
import { useCanAccess } from "@/hooks/useCanAccess";

// Example regular component that we'll wrap with permissions
const SensitiveDataComponent: React.FC = () => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <h3 className="text-lg font-semibold text-red-800">Sensitive Admin Data</h3>
    <p className="text-red-700">
      This component should only be visible to admins.
    </p>
  </div>
);

// Wrap the component with permissions using HOC
const ProtectedSensitiveData = withPermissions(
  SensitiveDataComponent,
  ["admin_access", "super_admin"],
  {
    mode: "requireAny",
    fallback: <div className="text-gray-500">Access denied</div>,
    debug: true,
  }
);

/**
 * Comprehensive demo of the permission system's UI visibility controls
 *
 * This component demonstrates:
 * - Permission-aware buttons (Create, Edit, Delete, View)
 * - Page sections that hide based on permissions
 * - Protected components with fallbacks
 * - Utility hooks for custom logic
 * - Higher-order components for wrapping existing components
 */
export const PermissionUIDemo: React.FC = () => {
  // Example of using utility hook for custom logic
  const userSectionVisibility = useSectionVisibility(
    ["view_user", "create_user"],
    "requireAny"
  );

  // Example of comprehensive access checking
  const vehicleAccess = useCanAccess({
    permissions: [
      "view_vehicle",
      "create_vehicle",
      "edit_vehicle",
      "delete_vehicle",
    ],
    mode: "requireAny",
  });

  const handleUserAction = (action: string) => {
    console.log(`User ${action} clicked`);
  };

  const handleVehicleAction = (action: string) => {
    console.log(`Vehicle ${action} clicked`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Permission System UI Demo
        </h1>
        <p className="text-gray-600 mb-6">
          This page demonstrates various permission-aware UI components.
          Elements will appear/disappear based on your current permissions.
        </p>

        {/* Debug information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">
            Debug Information
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>
              User Section Visible:{" "}
              {userSectionVisibility.isVisible ? "✅" : "❌"}
            </p>
            <p>Vehicle Access: {vehicleAccess.canAccess ? "✅" : "❌"}</p>
            <p>Loading State: {vehicleAccess.isLoading ? "🔄" : "✅"}</p>
          </div>
        </div>
      </div>

      {/* Individual Permission Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Individual Permission Buttons
        </h2>
        <p className="text-gray-600 mb-4">
          These buttons show/hide based on specific permissions:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              User Management Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <ViewButton
                resource="user"
                onClick={() => handleUserAction("view")}
                debug={true}
              />
              <CreateButton
                resource="user"
                onClick={() => handleUserAction("create")}
                debug={true}
              />
              <EditButton
                resource="user"
                onClick={() => handleUserAction("edit")}
                debug={true}
              />
              <DeleteButton
                resource="user"
                onClick={() => handleUserAction("delete")}
                debug={true}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Vehicle Management Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <ActionButtons
                resource="vehicle"
                onView={() => handleVehicleAction("view")}
                onCreate={() => handleVehicleAction("create")}
                onEdit={() => handleVehicleAction("edit")}
                onDelete={() => handleVehicleAction("delete")}
                showLabels={true}
                size="md"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Custom Permission Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <CreateButton
                permission="manage_financing"
                onClick={() => console.log("Custom financing action")}
                variant="success"
              >
                Manage Financing
              </CreateButton>
              <EditButton
                permission="generate_reports"
                onClick={() => console.log("Generate report")}
                variant="warning"
              >
                Generate Report
              </EditButton>
            </div>
          </div>
        </div>
      </div>

      {/* Protected Components */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Protected Components
        </h2>
        <p className="text-gray-600 mb-4">
          These components use different protection modes:
        </p>

        <div className="space-y-4">
          <ProtectedComponent
            permissions="view_user"
            fallback={
              <div className="text-amber-600">
                ⚠️ You need 'view_user' permission to see this content
              </div>
            }
            debug={true}
          >
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800">
                User Data Component
              </h3>
              <p className="text-green-700">
                This shows when you have 'view_user' permission.
              </p>
            </div>
          </ProtectedComponent>

          <ProtectedComponent
            permissions={["admin_access", "super_admin"]}
            mode="requireAny"
            fallback={
              <div className="text-red-600">🚫 Admin access required</div>
            }
            debug={true}
          >
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800">
                Admin Panel Component
              </h3>
              <p className="text-purple-700">
                This shows when you have admin or super admin access.
              </p>
            </div>
          </ProtectedComponent>

          {/* Using HOC */}
          <ProtectedSensitiveData />
        </div>
      </div>

      {/* Page Sections */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page Sections
        </h2>
        <p className="text-gray-600 mb-4">
          These sections hide completely when user lacks permissions:
        </p>

        <div className="space-y-6">
          <UserManagementSection>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">
                User Management Section
              </h3>
              <p className="text-blue-700 mb-3">
                This section is visible if you have any user-related
                permissions.
              </p>
              <ActionButtons
                resource="user"
                onView={() => handleUserAction("view")}
                onCreate={() => handleUserAction("create")}
                onEdit={() => handleUserAction("edit")}
                onDelete={() => handleUserAction("delete")}
                showLabels={true}
              />
            </div>
          </UserManagementSection>

          <VehicleManagementSection>
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-800">
                Vehicle Management Section
              </h3>
              <p className="text-indigo-700 mb-3">
                This section shows vehicle management tools.
              </p>
              <ActionButtons
                resource="vehicle"
                onView={() => handleVehicleAction("view")}
                onCreate={() => handleVehicleAction("create")}
                onEdit={() => handleVehicleAction("edit")}
                onDelete={() => handleVehicleAction("delete")}
                showLabels={true}
              />
            </div>
          </VehicleManagementSection>

          <AdminSection>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">
                Admin Section
              </h3>
              <p className="text-red-700">
                This section is only visible to administrators.
              </p>
            </div>
          </AdminSection>

          <FinancingSection>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">
                Financing Section
              </h3>
              <p className="text-green-700">
                This section handles financing-related operations.
              </p>
            </div>
          </FinancingSection>

          <ReportsSection>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">
                Reports Section
              </h3>
              <p className="text-yellow-700">
                This section provides reporting capabilities.
              </p>
            </div>
          </ReportsSection>

          <SettingsSection>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Settings Section
              </h3>
              <p className="text-gray-700">
                This section contains system settings.
              </p>
            </div>
          </SettingsSection>

          {/* Custom section with specific permissions */}
          <PageSection
            requiredPermissions={["create_user", "edit_user", "delete_user"]}
            mode="requireAll"
            fallback={
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-700">
                  🔒 You need all user management permissions to access this
                  section.
                </p>
              </div>
            }
            debug={true}
          >
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800">
                Full User Management Section
              </h3>
              <p className="text-emerald-700">
                This section requires ALL user management permissions (create,
                edit, delete).
              </p>
            </div>
          </PageSection>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Usage Examples
        </h2>

        <div className="prose max-w-none">
          <h3>Basic Button Usage:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`<CreateButton 
  resource="user" 
  onClick={() => createUser()}
/>

<EditButton 
  permission="custom_permission"
  onClick={() => editItem()}
  variant="warning"
/>

<ActionButtons
  resource="vehicle"
  onView={() => viewVehicle()}
  onCreate={() => createVehicle()}
  onEdit={() => editVehicle()}
  onDelete={() => deleteVehicle()}
/>`}
          </pre>

          <h3>Protected Component Usage:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`<ProtectedComponent
  permissions={["view_data", "manage_data"]}
  mode="requireAny"
  fallback={<div>Access denied</div>}
>
  <SensitiveComponent />
</ProtectedComponent>`}
          </pre>

          <h3>Page Section Usage:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`<UserManagementSection>
  <UserTable />
  <UserActions />
</UserManagementSection>

<PageSection
  requiredPermissions="admin_access"
  mode="require"
>
  <AdminPanel />
</PageSection>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PermissionUIDemo;
