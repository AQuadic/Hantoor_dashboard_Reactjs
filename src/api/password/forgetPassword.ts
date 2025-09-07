import { axios } from "@/lib/axios";

export type ResetType = "whatsapp_send" | "whatsapp_receive" | "mail_url" | "mail_otp" | "sms";

export interface ForgotPasswordRequest {
  email?: string;
  phone?: string;
  phone_country?: string;
  reset_type: ResetType;
}

export interface ForgotPasswordResponse {
  message: string;
  [key: string]: any;
}

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  const response = await axios.post<ForgotPasswordResponse>("/admin/forgot", data, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return response.data;
};
