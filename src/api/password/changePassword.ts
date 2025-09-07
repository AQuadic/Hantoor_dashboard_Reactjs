import { axios } from "@/lib/axios";

export interface ChangePasswordRequest {
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async (
  userId: string | number,
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const formData = new FormData();

  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  const response = await axios.post<ChangePasswordResponse>(
    `/user/admin/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
