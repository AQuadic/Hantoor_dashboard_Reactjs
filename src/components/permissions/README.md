# Permission-Based UI Visibility System

A comprehensive React system for controlling UI element visibility based on user permissions. This system provides components, hooks, and utilities to conditionally render UI elements, buttons, and entire page sections based on the user's current permissions.

## Features

- 🔐 **Permission-aware buttons** - Buttons that automatically hide or disable based on permissions
- 🧩 **Protected components** - Wrapper components for conditional rendering
- 📄 **Page sections** - Hide entire sections when users lack permissions
- 🎣 **Custom hooks** - For building your own permission-aware components
- 🔧 **Utility functions** - HOCs and helper functions for advanced use cases
- 🐛 **Debug mode** - Built-in debugging for troubleshooting permissions
- 🎨 **Flexible styling** - Customizable appearance and behavior

## Quick Start

```tsx
import {
  CreateButton,
  ProtectedComponent,
  UserManagementSection
} from '@/components/permissions';

// Simple permission button
<CreateButton
  resource="user"
  onClick={() => createUser()}
/>

// Protected content
<ProtectedComponent permissions="admin_access">
  <AdminPanel />
</ProtectedComponent>

// Hide entire sections
<UserManagementSection>
  <UserTable />
  <UserActions />
</UserManagementSection>
```

## Components

### ProtectedComponent

Conditionally renders children based on permissions with flexible access modes and fallback options.

```tsx
<ProtectedComponent
  permissions={["edit_user", "delete_user"]}
  mode="requireAny"
  fallback={<div>Access denied</div>}
  debug={true}
>
  <UserEditForm />
</ProtectedComponent>
```

**Props:**

- `permissions?: string | string[]` - Required permissions
- `roles?: string | string[]` - Required roles (alternative to permissions)
- `mode?: "require" | "requireAny" | "requireAll" | "requireRole"` - Access mode
- `fallback?: ReactNode` - What to show when access is denied
- `hideFallback?: boolean` - Hide completely instead of showing fallback
- `debug?: boolean` - Enable debug logging

### Permission Buttons

Specialized button components that automatically handle permission checking:

#### Individual Buttons

```tsx
<CreateButton resource="user" onClick={() => createUser()} />
<EditButton resource="user" onClick={() => editUser()} />
<DeleteButton resource="user" onClick={() => deleteUser()} />
<ViewButton resource="user" onClick={() => viewUser()} />
```

#### Action Button Group

```tsx
<ActionButtons
  resource="vehicle"
  onView={() => viewVehicle()}
  onCreate={() => createVehicle()}
  onEdit={() => editVehicle()}
  onDelete={() => deleteVehicle()}
  showLabels={true}
  size="md"
/>
```

**Button Props:**

- `resource?: string` - Resource name (auto-generates permission like "create_user")
- `permission?: string` - Override default permission
- `hideOnNoAccess?: boolean` - Hide completely vs show disabled
- `variant?: ButtonVariant` - Styling variant
- `size?: ButtonSize` - Button size
- `debug?: boolean` - Enable debug mode

### Page Sections

Components that hide entire page sections when users lack related permissions:

#### Specialized Sections

```tsx
<UserManagementSection>
  <UserTable />
  <UserActions />
</UserManagementSection>

<VehicleManagementSection>
  <VehicleGrid />
  <VehicleFilters />
</VehicleManagementSection>

<AdminSection>
  <SystemSettings />
  <UserRoles />
</AdminSection>
```

#### Generic Section

```tsx
<PageSection
  requiredPermissions={["view_reports", "generate_reports"]}
  mode="requireAny"
  fallback={<div>Reports not available</div>}
>
  <ReportsInterface />
</PageSection>
```

## Hooks

### useCanAccess

Comprehensive hook for access checking with helper methods:

```tsx
const {
  canAccess,
  isLoading,
  canView,
  canCreate,
  canEdit,
  canDelete,
  checkPermission,
  checkAnyPermission,
  checkAllPermissions,
} = useCanAccess({
  permissions: ["view_user", "edit_user"],
  mode: "requireAny",
});

if (isLoading) return <Loading />;
if (!canAccess) return <AccessDenied />;
```

### useSectionVisibility

Utility hook for custom section visibility logic:

```tsx
const { isVisible, isLoading, canAccess } = useSectionVisibility(
  ["admin_access", "super_admin"],
  "requireAny"
);

return isVisible ? <AdminTools /> : null;
```

### Permission Hooks

Lower-level hooks for specific permission checks:

```tsx
const { hasPermission } = useHasPermission("create_user");
const hasAnyAdmin = useHasAnyPermission(["admin", "super_admin"]);
const hasAllPerms = useHasAllPermissions(["view", "edit", "delete"]);
const { hasRole } = useHasRole("admin");
```

## Advanced Usage

### Higher-Order Component

Wrap existing components with permission checks:

```tsx
const ProtectedUserForm = withPermissions(
  UserForm,
  ["edit_user", "create_user"],
  {
    mode: "requireAny",
    fallback: <div>Access denied</div>,
    debug: true,
  }
);

// Use like any other component
<ProtectedUserForm userId={123} />;
```

### Custom Permission Logic

Build your own permission-aware components:

```tsx
const CustomProtectedButton: React.FC = () => {
  const { canAccess, isLoading } = useCanAccess({
    permissions: "custom_action",
    mode: "require",
  });

  if (isLoading) return <Spinner />;

  return (
    <button disabled={!canAccess} onClick={canAccess ? handleClick : undefined}>
      {canAccess ? "Execute Action" : "No Access"}
    </button>
  );
};
```

## Permission Modes

The system supports multiple access modes:

- **`require`** - Single permission required (default for single permission)
- **`requireAny`** - At least one permission required (default for arrays)
- **`requireAll`** - All permissions required
- **`requireRole`** - Role-based access instead of permissions

## Debugging

Enable debug mode on any component to see permission checking in the console:

```tsx
<ProtectedComponent permissions="admin_access" debug={true}>
  <AdminPanel />
</ProtectedComponent>

// Console output:
// 🔐 ProtectedComponent Debug: {
//   permissions: "admin_access",
//   hasAccess: true,
//   isLoading: false
// }
```

Global debug access through browser console:

```javascript
// Check current user permissions
window.__HANTOOR_PERMISSIONS__.debugPermissions();

// Check specific permission
window.__HANTOOR_PERMISSIONS__.hasPermission("create_user");
```

## Integration

The system integrates with the existing permission context:

```tsx
// In your app root
<PermissionProvider>
  <App />
</PermissionProvider>

// Permission data is automatically loaded from /admin/getCurrentPermissions
// and made available throughout the component tree
```

## Backend Integration

The system expects permissions from your backend in this format:

```json
{
  "current_permissions": [
    "view_user",
    "create_user",
    "edit_user",
    "delete_user",
    "admin_access"
  ]
}
```

Permission keys should use underscore format (e.g., `create_user`, not `create.user`).

## Best Practices

1. **Use resource-based permissions** - `<CreateButton resource="user" />` is cleaner than `<CreateButton permission="create_user" />`

2. **Prefer hiding over disabling** - Use `hideOnNoAccess={true}` for better UX

3. **Use specialized sections** - `<UserManagementSection>` is more semantic than generic `<PageSection>`

4. **Enable debug mode during development** - Helps troubleshoot permission issues

5. **Handle loading states** - Always consider the loading state when permissions are being fetched

6. **Use fallbacks appropriately** - Provide meaningful fallbacks for better user experience

## File Structure

```
src/
├── components/permissions/
│   ├── index.ts                 # Main exports
│   ├── ProtectedComponent.tsx   # Core protection wrapper
│   ├── PermissionButtons.tsx    # Button components
│   └── PageSections.tsx         # Section components
├── hooks/
│   ├── useCanAccess.ts         # Main access hook
│   └── usePermissions.ts        # Base permission hooks
├── utils/
│   ├── permissionUtils.ts       # Utility functions
│   └── permissionSectionUtils.tsx # Section utilities
└── examples/
    └── PermissionUIDemo.tsx     # Comprehensive demo
```

## Examples

See `PermissionUIDemo.tsx` for a comprehensive demonstration of all features, including:

- Individual and grouped buttons
- Protected components with different modes
- Page sections with fallbacks
- Custom permission logic
- Debug information
- Usage patterns and code examples

The demo component can be imported and used in your development environment to test the permission system with your actual user permissions.
