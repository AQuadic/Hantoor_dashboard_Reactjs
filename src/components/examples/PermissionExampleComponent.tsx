import React from "react";
import {
  usePermissions,
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
} from "@/hooks/usePermissions";

/**
 * Example component demonstrating how to use the Permission Management System
 * This component shows various ways to check permissions and conditionally render content
 */
const PermissionExampleComponent: React.FC = () => {
  // Get full permission context
  const {
    permissions,
    roles,
    isLoading,
    error,
    fetchPermissions,
    refreshPermissions,
  } = usePermissions();

  // Convenience hooks for specific permission checks
  const canCreateUser = useHasPermission("create_user");
  const canEditUser = useHasPermission("edit_user");
  const canDeleteUser = useHasPermission("delete_user");

  // Check for multiple permissions (ALL must be present)
  const canFullyManageUsers = useHasPermission([
    "create_user",
    "edit_user",
    "delete_user",
  ]);

  // Check if user has ANY of these permissions
  const canAccessUserModule = useHasAnyPermission([
    "view_user",
    "create_user",
    "edit_user",
  ]);

  // Check if user has ALL of these permissions
  const canPerformBulkOperations = useHasAllPermissions([
    "create_user",
    "edit_user",
  ]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading permissions...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Permission Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPermissions}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">Permission Management Example</h2>
      {/* Permission Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-800 font-semibold mb-2">Permission Summary</h3>
        <p className="text-blue-600">
          You have {permissions.length} permissions and {roles.length} roles
        </p>

        {/* Debug: Show first few permissions */}
        <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
          <strong>Sample permissions:</strong>{" "}
          {permissions
            .slice(0, 5)
            .map((p) => p.key)
            .join(", ")}
          {permissions.length > 5 && ` ...and ${permissions.length - 5} more`}
        </div>

        <button
          onClick={refreshPermissions}
          className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Refresh Permissions
        </button>
      </div>{" "}
      {/* Conditional Content Based on Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Management Section */}
        {canAccessUserModule && (
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">User Management</h4>

            {canCreateUser && (
              <button className="bg-green-600 text-white px-3 py-1 rounded mr-2 mb-2 hover:bg-green-700">
                Create User
              </button>
            )}

            {canEditUser && (
              <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 mb-2 hover:bg-blue-700">
                Edit User
              </button>
            )}

            {canDeleteUser && (
              <button className="bg-red-600 text-white px-3 py-1 rounded mr-2 mb-2 hover:bg-red-700">
                Delete User
              </button>
            )}

            {canFullyManageUsers && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800 text-sm">
                  ✓ Full user management access
                </p>
              </div>
            )}

            {canPerformBulkOperations && (
              <button className="bg-purple-600 text-white px-3 py-1 rounded mt-2 hover:bg-purple-700">
                Bulk Operations
              </button>
            )}
          </div>
        )}

        {/* Permissions List */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Your Permissions</h4>
          <div className="max-h-40 overflow-y-auto">
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="text-sm py-1 border-b last:border-b-0"
                >
                  <span className="font-medium">{permission.key}</span>
                  <span className="text-gray-600 ml-2">
                    ({permission.titleEn})
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No permissions found</p>
            )}
          </div>
        </div>

        {/* Roles List */}
        {roles.length > 0 && (
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Your Roles</h4>
            <div className="space-y-2">
              {roles.map((role) => (
                <div key={role.id} className="bg-gray-50 rounded p-2">
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-gray-600">
                    {role.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {role.permissions.length} permissions
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permission Checks Examples */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Permission Check Examples</h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Single Permission (create_user):</strong>
              <span
                className={canCreateUser ? "text-green-600" : "text-red-600"}
              >
                {canCreateUser
                  ? " ✓ Can create users"
                  : " ✗ Cannot create users"}
              </span>
            </div>
            <div>
              <strong>
                Any Permission (view_user, create_user, edit_user):
              </strong>
              <span
                className={
                  canAccessUserModule ? "text-green-600" : "text-red-600"
                }
              >
                {canAccessUserModule
                  ? " ✓ Can access user module"
                  : " ✗ Cannot access user module"}
              </span>
            </div>
            <div>
              <strong>
                All Permissions (create_user, edit_user, delete_user):
              </strong>
              <span
                className={
                  canFullyManageUsers ? "text-green-600" : "text-red-600"
                }
              >
                {canFullyManageUsers
                  ? " ✓ Full user management"
                  : " ✗ Limited user management"}
              </span>
            </div>
          </div>

          {/* Debug info */}
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
            <strong>Debug Info:</strong>
            <div>
              User permissions:{" "}
              {permissions
                .filter((p) => p.key.includes("user"))
                .map((p) => p.key)
                .join(", ") || "None found"}
            </div>
            <div>Total permissions loaded: {permissions.length}</div>
          </div>
        </div>
      </div>
      {/* No Access Message */}
      {!canAccessUserModule && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-600">
            You don't have permission to access the user management module.
          </p>
        </div>
      )}
    </div>
  );
};

export default PermissionExampleComponent;
