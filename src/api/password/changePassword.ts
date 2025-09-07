import { axios } from "@/lib/axios";

export interface ChangePasswordRequest {
  password: string;
  password_confirmation: string;

  reset_token?: string;
  email?: string;
  phone?: string;
  phone_country?: string;
  current_password?: string;
  firebase_token?: string;
}

export interface ChangePasswordResponse {
  message: string;
  [key: string]: any;
}

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await axios.post<ChangePasswordResponse>(
    "/admin/change_password",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
