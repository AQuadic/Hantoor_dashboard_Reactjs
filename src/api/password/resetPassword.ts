import { axios } from "@/lib/axios";

export interface ResetPasswordRequest {
  password: string;
  password_confirmation: string;
  reset_token: string;
  email?: string;
  phone?: string;
  phone_country?: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    const response = await axios.post<ResetPasswordResponse>(
      "/admin/reset-password",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const errorWithResponse = error as { response?: { data?: unknown } };
      throw errorWithResponse.response?.data || error;
    }
    throw error;
  }
};
