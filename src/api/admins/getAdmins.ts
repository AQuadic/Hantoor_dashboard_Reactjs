import { axios } from "@/lib/axios";

export interface Admin {
  image: string;
  id: number;
  name: string;
  email: string;
  mobile?: string;
  created_at: string;
  updated_at: string;
}

export interface GetAdminsParams {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page?: number;
  per_page?: number;
  total?: number;
}

export async function getAdmins(
  params: GetAdminsParams = {}
): Promise<PaginatedResponse<Admin>> {
  const response = await axios.get<PaginatedResponse<Admin>>("/admin", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params,
  });
  return response.data;
}
