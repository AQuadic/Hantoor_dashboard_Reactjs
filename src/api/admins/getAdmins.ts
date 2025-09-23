import { axios } from "@/lib/axios";

export interface AdminImage {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface AdminRole {
  id: number;
  name: string;
  permissions: string[];
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  image?: AdminImage | null;
  isActive?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_online: string;
  roles?: AdminRole[] | null;
}

export interface GetAdminsParams {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  page?: number;
  from_date?: string;
  to_date?: string;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
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
