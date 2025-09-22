import { axios } from "@/lib/axios";

export interface UpdateBankStatusPayload {
  is_active: boolean;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}

export async function updateBankStatus(
  id: number,
  data: UpdateBankStatusPayload
): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append("is_active", data.is_active ? "1" : "0");
  formData.append("_method", "put");

  const response = await axios.post<ApiResponse>(
    `/admin/banks/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}
