import { axios } from "@/lib/axios";

interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  phone_country?: string
}

interface CreateAdminResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function createAdmin(
  payload: CreateAdminPayload
): Promise<CreateAdminResponse> {
  const response = await axios.post<CreateAdminResponse>("/admin", payload);
  return response.data;
}
