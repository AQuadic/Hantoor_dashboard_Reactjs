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

    // Helper: derive resource identifier from a permission key
    const actionPrefixes = new Set([
      "view",
      "create",
      "edit",
      "delete",
      "change-status",
      "change_status",
      "block",
      "link",
      "vehicle",
      "notes",
      "email",
      "star",
      "change-password",
      "vehicle_chat",
    ]);

    const trailingSuffixes = new Set(["count", "dashboard"]);

    const extractResource = (key: string) => {
      if (!key) return "";
      const parts = key.split("_");
      // drop leading action prefixes
      while (parts.length > 0 && actionPrefixes.has(parts[0])) {
        parts.shift();
      }
      // drop trailing suffixes like count/dashboard
      while (parts.length > 0 && trailingSuffixes.has(parts.at(-1)!)) {
        parts.pop();
      }
      return parts.join("_");
    };

    // Helper: returns true if the user's permissions match the given required permission
    // Matching rules (strict):
    // - exact permission key match, OR
    // - resource derived from user permission equals resource derived from required permission
    // IMPORTANT: Dashboard permissions (containing "_dashboard") should NEVER match entity permissions
    const permissionMatches = (requiredPermission: string) => {
      if (permissionKeys.has(requiredPermission)) return true;

      // Don't do fuzzy matching for dashboard permissions
      if (requiredPermission.includes("_dashboard")) return false;

      const reqResource = extractResource(requiredPermission);
      if (!reqResource) return false;

      for (const k of permissionKeys) {
        if (k === requiredPermission) return true;

        // Don't allow dashboard permissions to match with entity permissions
        if (k.includes("_dashboard")) continue;

        const userResource = extractResource(k);
        if (userResource && userResource === reqResource) return true;
      }

      return false;
    };

    return SidebarLinks.filter((link) => {
      // If no permissions required, always show the link (e.g., Dashboard, Logout)
      if (!link.requiredPermissions || link.requiredPermissions.length === 0) {
        return true;
      }

      // Use requireAny/requireAll semantics to determine visibility.
      // Previously we enforced that a link containing any `view_` permission
      // required the user to own a `view_` permission specifically. That caused
      // links to be hidden when a user had other relevant permissions (e.g.
      // `edit_user`) but not a `view_user` permission. Instead, honor the
      // link's `requireAny` flag (default true) so that having any of the
      // required permissions (view/create/edit/delete/block, etc.) will show
      // the link when `requireAny` is true.
      const requireAny = link.requireAny ?? true;

      if (requireAny) {
        // Default: show link if user has ANY of the required permissions
        return link.requiredPermissions.some((permission) =>
          permissionMatches(permission)
        );
      }

      // Otherwise, require ALL permissions
      return link.requiredPermissions.every((permission) =>
        permissionMatches(permission)
      );
    });
  }, [permissions]);

  return filteredLinks;
};

export default useFilteredSidebarLinks;
