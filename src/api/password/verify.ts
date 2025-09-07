import { axios } from "@/lib/axios";

export type VerifyType = "verify" | "reset";

export interface VerifyRequest {
  email?: string;
  phone?: string; 
  phone_country?: string;
  code: string;
  type: VerifyType;
}

export interface VerifyResponse {
  message: string;
  [key: string]: any;
}

export const verifyAdmin = async (data: VerifyRequest): Promise<VerifyResponse> => {
  try {
    const response = await axios.post<VerifyResponse>("/admin/verify", data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
