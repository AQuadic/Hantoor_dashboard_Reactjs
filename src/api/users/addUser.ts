import { axios } from "@/lib/axios";

export interface CreateAdminUserPayload {
  name: string;
  email?: string;
  phone: string;
  phone_country: string;
  image?: File;
  country_id?: string;
  city_id?: string;
  password?: string;
  password_confirmation?: string;
}

export const createAdminUser = async (payload: CreateAdminUserPayload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  if (payload.email) formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("phone_country", payload.phone_country);
  if (payload.image) formData.append("image", payload.image);
  if (payload.country_id) formData.append("country_id", payload.country_id);
  if (payload.city_id) formData.append("city_id", payload.city_id);
  if (payload.password) formData.append("password", payload.password);
  if (payload.password_confirmation)
    formData.append("password_confirmation", payload.password_confirmation);

  try {
    const response = await axios.post("/user/admin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating admin user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
