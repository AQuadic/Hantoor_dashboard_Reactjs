# Permission Management System

A comprehensive permission management system built with React Context API, TypeScript, and custom hooks for managing user permissions and roles throughout the application.

## Features

- **React Context API** for global permission state management
- **Custom Hooks** for easy permission checking throughout the app
- **TypeScript** with full type safety and interfaces
- **Utility Functions** for permission validation logic
- **API Integration** with the backend permission system
- **Error Handling** and loading states
- **Flexible Permission Checking** (single, multiple, any, all)
- **Role-based Access Control** support
- **Module-based Permission Grouping**
- **Auto-refresh** capabilities with configurable intervals

## Architecture

```
src/
├── api/permissions/
│   └── getCurrentPermissions.ts     # API service for fetching permissions
├── contexts/
│   ├── permission-context.ts        # Context definition
│   └── PermissionContext.tsx        # Provider component
├── hooks/
│   └── usePermissions.ts           # Custom hooks for permission access
├── types/
│   └── PermissionTypes.ts          # TypeScript interfaces and types
├── utils/
│   └── permissionUtils.ts          # Utility functions for permission logic
├── permissions/
│   └── index.ts                    # Centralized exports
└── components/examples/
    └── PermissionExampleComponent.tsx # Usage example
```

## Installation & Setup

### 1. Provider Setup

The `PermissionProvider` is already integrated into your app via `Providers.tsx`:

```tsx
import { PermissionProvider } from "@/contexts/PermissionContext";

<PermissionProvider autoFetch={true}>{children}</PermissionProvider>;
```

### 2. API Endpoint

Ensure your backend provides the `/admin/getCurrentPermissions` endpoint that returns:

```json
{
  "current_permissions": [
    "view_user",
    "create_user",
    "edit_user",
    "delete_user",
    "view_admin",
    "create_admin",
    "edit_admin",
    "delete_admin"
  ]
}
```

Note: The API returns a simple array of permission strings under `current_permissions`. The system automatically converts these to Permission objects internally.

## Usage Examples

### Basic Permission Checking

```tsx
import { useHasPermission } from "@/hooks/usePermissions";

const MyComponent = () => {
  const canCreateUser = useHasPermission("create_user");

  return <div>{canCreateUser && <button>Create User</button>}</div>;
};
```

### Multiple Permission Checks

```tsx
import {
  useHasAnyPermission,
  useHasAllPermissions,
} from "@/hooks/usePermissions";

const UserManagement = () => {
  // User needs ANY of these permissions to access the module
  const canAccessModule = useHasAnyPermission([
    "view_user",
    "create_user",
    "edit_user",
  ]);

  // User needs ALL of these permissions for full management
  const canFullyManage = useHasAllPermissions([
    "create_user",
    "edit_user",
    "delete_user",
  ]);

  if (!canAccessModule) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <button>View Users</button>
      {canFullyManage && <button>Advanced Management</button>}
    </div>
  );
};
```

### Using the Full Context

```tsx
import { usePermissions } from "@/hooks/usePermissions";

const PermissionDashboard = () => {
  const {
    permissions,
    roles,
    isLoading,
    error,
    fetchPermissions,
    hasPermission,
  } = usePermissions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Permissions ({permissions.length})</h2>
      <button onClick={fetchPermissions}>Refresh</button>

      {hasPermission("view_admin_dashboard") && <AdminDashboard />}
    </div>
  );
};
```

### Role-based Access

```tsx
import { useHasRole } from "@/hooks/usePermissions";

const AdminPanel = () => {
  const isAdmin = useHasRole("admin");
  const isSuperUser = useHasRole("super_user");

  if (!isAdmin && !isSuperUser) {
    return <div>Access Denied</div>;
  }

  return <div>Admin Panel Content</div>;
};
```

## Utility Functions

You can also use utility functions directly for permission logic:

```tsx
import { hasPermission, hasAnyPermission } from "@/utils/permissionUtils";

// In a service or utility function
const checkUserAccess = (userPermissions: Permission[]) => {
  return {
    canCreate: hasPermission(userPermissions, "create_user"),
    canAccess: hasAnyPermission(userPermissions, ["view_user", "edit_user"]),
  };
};
```

## Available Hooks

| Hook                         | Description                       | Parameters           | Returns                 |
| ---------------------------- | --------------------------------- | -------------------- | ----------------------- |
| `usePermissions()`           | Main hook providing full context  | None                 | `PermissionContextType` |
| `useHasPermission(key)`      | Check single/multiple permissions | `string \| string[]` | `boolean`               |
| `useHasAnyPermission(keys)`  | Check if user has any permission  | `string[]`           | `boolean`               |
| `useHasAllPermissions(keys)` | Check if user has all permissions | `string[]`           | `boolean`               |
| `useHasRole(key)`            | Check user roles                  | `string \| string[]` | `boolean`               |
| `usePermissionsLoading()`    | Get loading state                 | None                 | `boolean`               |
| `usePermissionsError()`      | Get error state                   | None                 | `string \| null`        |
| `usePermissionActions()`     | Get action functions              | None                 | `object`                |

## Configuration Options

### PermissionProvider Props

```tsx
<PermissionProvider
  autoFetch={true} // Auto-fetch on mount
  refreshInterval={300000} // Auto-refresh every 5 minutes
>
  {children}
</PermissionProvider>
```

## Error Handling

The system includes comprehensive error handling:

```tsx
const { error, isLoading, fetchPermissions } = usePermissions();

if (error) {
  return (
    <div>
      <p>Failed to load permissions: {error}</p>
      <button onClick={fetchPermissions}>Retry</button>
    </div>
  );
}
```

## Best Practices

1. **Use specific permission keys**: Instead of checking roles, check specific permissions
2. **Combine with route guards**: Use permissions in your route guards for page-level access
3. **Cache considerations**: The system automatically manages caching, but you can force refresh when needed
4. **Error boundaries**: Wrap permission-dependent components in error boundaries
5. **Loading states**: Always handle loading states in your UI
6. **Permission granularity**: Design permissions to be as granular as needed for your use case

## Integration with Route Guards

You can integrate this with your existing route guards:

```tsx
// In your PrivateRouteGuard or similar
import { useHasPermission } from "@/hooks/usePermissions";

const PermissionGuard = ({ permission, children }) => {
  const hasAccess = useHasPermission(permission);

  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

## TypeScript Support

All components include full TypeScript support with proper interfaces:

```tsx
import type {
  Permission,
  Role,
  PermissionContextType,
} from "@/types/PermissionTypes";
```

## Testing

The permission system is designed to be easily testable:

```tsx
// Mock the context for testing
import { PermissionContext } from "@/contexts/permission-context";

const mockPermissions = {
  permissions: [{ key: "create_user", name: "Create User" }],
  hasPermission: jest.fn(),
  // ... other mock values
};

<PermissionContext.Provider value={mockPermissions}>
  <YourComponent />
</PermissionContext.Provider>;
```

## Performance Considerations

- Context values are memoized to prevent unnecessary re-renders
- Permission checks are optimized with efficient array operations
- Auto-refresh can be configured or disabled based on your needs
- Permissions are cached and only re-fetched when necessary

## Troubleshooting

### Common Issues

1. **"usePermissions must be used within a PermissionProvider"**

   - Ensure your component is wrapped with `<PermissionProvider>`

2. **Permissions not loading**

   - Check network requests to `/admin/getCurrentPermissions`
   - Verify authentication token is being sent

3. **TypeScript errors**
   - Ensure all permission interfaces are properly imported
   - Check that your API response matches the expected format

### Debug Mode

You can enable debugging by checking the context state:

```tsx
const { permissions, error, lastFetched } = usePermissions();
console.log("Permissions Debug:", { permissions, error, lastFetched });
```
