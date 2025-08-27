 import { axios } from "@/lib/axios";

export interface UpdateAdminPayload {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  password_confirmation?: string;
  isActive?: boolean;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  created_at: string;
  updated_at: string;
  isActive?: boolean;
}

export async function updateAdmin(
  adminId: string | number,
  payload: UpdateAdminPayload
): Promise<Admin> {
  const response = await axios.post<Admin>(`/admin/${adminId}`, payload);
  return response.data;
}
