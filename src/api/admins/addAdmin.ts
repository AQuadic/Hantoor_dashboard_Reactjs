import { axios } from "@/lib/axios";

interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  phone_country?: string;
  image?: File | null;
  role?: string;
}

interface CreateAdminResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export async function createAdmin(
  payload: CreateAdminPayload
): Promise<CreateAdminResponse> {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);

  if (payload.phone) formData.append("phone", payload.phone);
  if (payload.phone_country)
    formData.append("phone_country", payload.phone_country);
  if (payload.role) formData.append("role", payload.role);
  if (payload.image) formData.append("image", payload.image);

  const response = await axios.post<CreateAdminResponse>("/admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
