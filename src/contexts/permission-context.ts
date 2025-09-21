import { createContext } from "react";
import { PermissionContextType } from "@/types/PermissionTypes";

// Create context
export const PermissionContext = createContext<
  PermissionContextType | undefined
>(undefined);
