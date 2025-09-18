import { axios } from "@/lib/axios";

export interface PermissionsResponse {
  permissions: {
    [section: string]: string[];
  };
}

export async function getPermissions(): Promise<PermissionsResponse> {
  const response = await axios.get("/api/admin/permissions");
  return response.data as PermissionsResponse;
}
