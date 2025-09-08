import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: { ar: string; en: string };
  code: string;
  currency: string;
  is_active: boolean;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  signup_with: string;
  country_id?: number;
  city_id?: number;
  created_at: string;
  updated_at: string;
  country?: Country | null;
  is_active: boolean; 
}

export interface AdminUsersResponse {
  data: AdminUser[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
    last_page?: number;
    total?: number;
  };
}

export interface GetAdminUsersParams {
  signup_with?: string;
  country_id?: number;
  city_id?: number;
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  page?: number;
  from_date?: string;
  to_date?: string;  
}

export async function getAdminUsers(params: GetAdminUsersParams = {}): Promise<AdminUsersResponse> {
  const response = await axios.get<AdminUsersResponse>("/user/admin", {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}
