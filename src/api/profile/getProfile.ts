import { axios } from "@/lib/axios";

export interface GetCurrentAdminResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  phone_country: string | null;
  phone_e164: string | null;
  phone_national: string | null;
  phone_normalized: string | null;
  phone_verified_at: string | null;
  role?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export const getCurrentAdmin = async (): Promise<GetCurrentAdminResponse> => {
  try {
    const response = await axios.get<GetCurrentAdminResponse>(
      "/admin/getCurrentAdmin",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};