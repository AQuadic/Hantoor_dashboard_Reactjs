import { axios } from "@/lib/axios";

export interface UpdateAdminPayload {
  name?: string;
  email?: string;
  phone?: string;
  phone_country?: string;
  password?: string;
  password_confirmation?: string;
  isActive?: boolean;
  image?: File | null;
  // If true, instruct server to remove existing image
  remove_image?: boolean;
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
  const formData = new FormData();

  if (payload.name !== undefined) formData.append("name", String(payload.name));
  if (payload.email !== undefined)
    formData.append("email", String(payload.email));
  if (payload.phone !== undefined)
    formData.append("phone", String(payload.phone));
  if (payload.phone_country !== undefined)
    formData.append("phone_country", String(payload.phone_country));
  if (payload.password !== undefined)
    formData.append("password", String(payload.password));
  if (payload.password_confirmation !== undefined)
    formData.append(
      "password_confirmation",
      String(payload.password_confirmation)
    );
  if (payload.isActive !== undefined)
    formData.append("is_active", payload.isActive ? "1" : "0");
  if (payload.image) formData.append("image", payload.image);
  if (payload.remove_image) formData.append("remove_image", "1");

  const response = await axios.post<Admin>(`/admin/${adminId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
