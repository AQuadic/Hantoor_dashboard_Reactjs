import { axios } from "@/lib/axios";
import type { DateFilterParams } from "@/utils/dateUtils";

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions: string[];
  is_active?: boolean;
}

export interface GetRolesResponse {
  data: Role[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface GetRolesParams extends Partial<DateFilterParams> {
  search?: string;
  pagination?: "normal" | "all";
  per_page?: number;
  page?: number;
  is_active?: boolean;
}

export async function getRoles(
  params: GetRolesParams = {}
): Promise<GetRolesResponse> {
  const response = await axios.get("/admin/roles", {
    params: {
      ...params,
    },
  });

  // Handle the case where API returns array directly (based on provided example)
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      total: response.data.length,
      current_page: 1,
      per_page: response.data.length,
      last_page: 1,
      from: 1,
      to: response.data.length,
    };
  }

  return response.data as GetRolesResponse;
}
