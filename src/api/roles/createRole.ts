import { axios } from "@/lib/axios";

export interface CreateRoleRequest {
  name: string;
  permissions: string[];
}

export interface CreateRoleResponse {
  id: number;
  name: string;
  guard_name: string;
  permissions: string[];
}

export async function createRole(
  data: CreateRoleRequest
): Promise<CreateRoleResponse> {
  const response = await axios.post("/admin/roles/new", data);
  return response.data as CreateRoleResponse;
}
