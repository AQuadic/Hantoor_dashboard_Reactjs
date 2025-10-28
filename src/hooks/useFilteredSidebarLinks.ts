import { useMemo } from "react";
import { SidebarLinks, type SidebarLink } from "@/constants/SidebarLinks";
import { usePermissions } from "@/hooks/usePermissions";

/**
 * Hook that filters sidebar links based on user permissions
 * Returns only the sidebar links that the user has permission to access
 */
export const useFilteredSidebarLinks = (): SidebarLink[] => {
  const { permissions } = usePermissions();

  // Filter sidebar links based on permissions
  const filteredLinks = useMemo(() => {
    // Get permission keys for easier checking
    const permissionKeys = new Set(permissions.map((p) => p.key));

    return SidebarLinks.filter((link) => {
      // If no permissions required, always show the link (e.g., Dashboard, Logout)
      if (!link.requiredPermissions || link.requiredPermissions.length === 0) {
        return true;
      }

      // Enforce: if any view_* permission exists in the requiredPermissions list,
      // the user must have at least one view permission to see the link.
      const viewPermissions = link.requiredPermissions.filter((p) =>
        p.startsWith("view_")
      );

      if (viewPermissions.length > 0) {
        // User must have at least one of the view permissions for this link
        const hasAnyView = viewPermissions.some((vp) => permissionKeys.has(vp));
        if (!hasAnyView) return false;
        // If user has view permission, allow showing the link (they can view at least one resource)
        return true;
      }

      // If no explicit view_* permissions are present, fall back to existing logic
      const requireAny = link.requireAny ?? true;

      if (requireAny) {
        // Default is requireAny: true - user needs ANY of the required permissions
        return link.requiredPermissions.some((permission) =>
          permissionKeys.has(permission)
        );
      }

      // User needs ALL of the required permissions
      return link.requiredPermissions.every((permission) =>
        permissionKeys.has(permission)
      );
    });
  }, [permissions]);

  return filteredLinks;
};

export default useFilteredSidebarLinks;
