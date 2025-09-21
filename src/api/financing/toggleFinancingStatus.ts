import { axios } from "@/lib/axios";

export interface ToggleFinancingResponse {
  success?: boolean;
  message?: string;
  data?: {
    id: number;
    is_active: boolean;
    updated_at?: string;
  };
}

export async function toggleFinancingStatus(
  id: number,
  is_active: boolean
): Promise<ToggleFinancingResponse> {
  const response = await axios.patch<ToggleFinancingResponse>(
    `/admin/financing/${id}`,
    { is_active },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}
