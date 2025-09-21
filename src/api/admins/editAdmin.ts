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
  role?: string;
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
  // If there's a File to upload, send multipart/form-data with a real PUT request.
  // Otherwise send a standard JSON PUT request (no multipart boundary, no _method).

  const hasFile = !!payload.image;

  if (hasFile) {
    const formData = new FormData();
    if (payload.name !== undefined)
      formData.append("name", String(payload.name));
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
    if (payload.role !== undefined)
      formData.append("role", String(payload.role));
    // append image file
    if (payload.image) formData.append("image", payload.image);
    // include explicit remove_image flag if provided
    if (payload.remove_image !== undefined)
      formData.append("remove_image", payload.remove_image ? "1" : "0");

    // Use PUT with FormData; do NOT manually set Content-Type so the browser/axios
    // can include the proper multipart boundary.
    const response = await axios.put<Admin>(`/admin/${adminId}`, formData);
    return response.data;
  }

  // No file: send JSON body via PUT to avoid multipart boundaries and _method field
  const jsonBody: Record<string, unknown> = {};
  if (payload.name !== undefined) jsonBody.name = payload.name;
  if (payload.email !== undefined) jsonBody.email = payload.email;
  if (payload.phone !== undefined) jsonBody.phone = payload.phone;
  if (payload.phone_country !== undefined)
    jsonBody.phone_country = payload.phone_country;
  if (payload.password !== undefined) jsonBody.password = payload.password;
  if (payload.password_confirmation !== undefined)
    jsonBody.password_confirmation = payload.password_confirmation;
  if (payload.isActive !== undefined)
    jsonBody.is_active = payload.isActive ? "1" : "0";
  if (payload.role !== undefined) jsonBody.role = payload.role;
  if (payload.remove_image !== undefined)
    jsonBody.remove_image = payload.remove_image ? "1" : "0";

  // No file: send JSON body with a real PUT request so axios sets
  // Content-Type: application/json automatically and no multipart header is sent.
  const response = await axios.post<Admin>(`/admin/${adminId}`, jsonBody);

  return response.data;
}
