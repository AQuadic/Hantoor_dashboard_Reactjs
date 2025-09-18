import { axios } from "@/lib/axios";

export interface UpdateProfilePayload {
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

export interface UpdateProfileResponse {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  phone_country?: string | null;
  image?: { url?: string | null } | null;
  // Allow unknown extra fields from backend without using any
  [key: string]: unknown;
}

// Posts profile updates for the current admin to /admin/update
export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  if (payload.image) {
    return postMultipart(payload);
  }
  return postJson(payload);
}

function buildFormData(payload: UpdateProfilePayload): FormData {
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
  if (payload.remove_image !== undefined)
    formData.append("remove_image", payload.remove_image ? "1" : "0");
  return formData;
}

function buildJsonBody(payload: UpdateProfilePayload): Record<string, unknown> {
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
  if (payload.remove_image !== undefined)
    jsonBody.remove_image = payload.remove_image ? "1" : "0";
  return jsonBody;
}

async function postMultipart(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const res = await axios.post<UpdateProfileResponse>(
    "/admin/update",
    buildFormData(payload)
  );
  return res.data;
}

async function postJson(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const res = await axios.post<UpdateProfileResponse>(
    "/admin/update",
    buildJsonBody(payload)
  );
  return res.data;
}
