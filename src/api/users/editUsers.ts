import { axios } from "@/lib/axios";

export interface UpdateAdminUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  phone_country?: string;
  image?: File;
  language?: "ar" | "en";
  country_id?: string;
  city_id?: string;
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
}

export const updateAdminUser = async (
  user: string | number,
  payload: UpdateAdminUserPayload
): Promise<AdminUser> => {
  try {
    const formData = new FormData();

    if (payload.name) formData.append("name", payload.name);
    if (payload.email) formData.append("email", payload.email);
    if (payload.phone) formData.append("phone", payload.phone);
    if (payload.phone_country)
      formData.append("phone_country", payload.phone_country);
    if (payload.image) formData.append("image", payload.image);
    if (payload.language) formData.append("language", payload.language);
    if (payload.country_id) formData.append("country_id", payload.country_id);
    if (payload.city_id) formData.append("city_id", payload.city_id);
    // Some backends expect form override for PUT via _method
    // Append _method=PUT so server treats this POST as an update
    formData.append("_method", "PUT");

    const response = await axios.post<AdminUser>(
      `/user/admin/${user}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    try {
      console.error("Error updating admin user:", JSON.stringify(error));
    } catch {
      console.error("Error updating admin user:", error);
    }
    throw error;
  }
};
