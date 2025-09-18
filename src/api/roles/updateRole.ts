import { axios } from "@/lib/axios";

export interface UpdateRoleRequest {
  name?: string;
  permissions?: string[];
  is_active?: boolean;
}

export interface UpdateRoleResponse {
  id: number;
  name: string;
  guard_name: string;
  permissions: string[];
}

export async function updateRole(
  id: string | number,
  data: UpdateRoleRequest
): Promise<UpdateRoleResponse> {
  const response = await axios.post(`/admin/roles/${id}`, data);
  return response.data as UpdateRoleResponse;
}
