export interface RouteTypes {
  path: string;
  element: React.ReactNode;
  children?: RouteTypes[];
  requiredPermissions?: string[];
  requireAny?: boolean; // Default: true (user needs ANY of the permissions), false = user needs ALL permissions
}
